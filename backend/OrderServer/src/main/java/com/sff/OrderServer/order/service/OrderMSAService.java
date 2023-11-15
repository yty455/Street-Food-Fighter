package com.sff.OrderServer.order.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sff.OrderServer.bucket.entity.Bucket;
import com.sff.OrderServer.dto.GradeUpdateRequest;
import com.sff.OrderServer.error.code.BucketError;
import com.sff.OrderServer.error.code.FundingError;
import com.sff.OrderServer.error.code.OrderError;
import com.sff.OrderServer.error.type.BaseException;
import com.sff.OrderServer.funding.entity.Funding;
import com.sff.OrderServer.funding.repository.FundingRepository;
import com.sff.OrderServer.order.dto.MenuPerOrderResponse;
import com.sff.OrderServer.order.dto.OrderCreateRequest;
import com.sff.OrderServer.order.dto.OrderCreateResponse;
import com.sff.OrderServer.order.dto.OrderFromFundingResponse;
import com.sff.OrderServer.order.dto.OrderPerUser;
import com.sff.OrderServer.order.entity.OrderRecord;
import com.sff.OrderServer.order.entity.OrderState;
import com.sff.OrderServer.order.repository.OrderRecordRepository;
import com.sff.OrderServer.utils.ApiError;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class OrderMSAService {

    private final OrderRecordRepository orderRepository;
    private final FundingRepository fundingRepository;
    private final OrderService orderService;
    private final ObjectMapper objectMapper = new ObjectMapper();
    private final KafkaTemplate<String, String> kafkaTemplate;

    @Transactional
    public OrderCreateResponse createOrder(OrderCreateRequest orderCreateRequest, Long userId) {
        Integer orderCount = orderRepository.countOrdersByStoreId(orderCreateRequest.getStoreId(),
                LocalDateTime.now());
        Bucket bucket = orderService.getBucket(orderCreateRequest.getBucketId());
        if (orderRepository.findByBucket(bucket).isPresent()) {
            throw new BaseException(new ApiError(OrderError.EXIST_ORDER_RECORD));
        }
        try {
            Long orderId = orderRepository.save(
                    new OrderRecord(orderCreateRequest, orderCount, bucket, userId)).getOrderId();
            return new OrderCreateResponse(orderId, bucket.getTotalPrice());
        } catch (Exception e) {
            e.printStackTrace();
            throw new BaseException(new ApiError(OrderError.FAILED_CREATE_ORDER));
        }
    }

    @Transactional
    public void updateOrderWaiting(Long orderId) {
        OrderRecord orderRecord = orderService.getOrderRecord(orderId);
        try {
            orderRecord.updateOrderState(OrderState.WAITING);
        } catch (Exception e) {
            throw new BaseException(new ApiError(OrderError.FAILED_UPDATE_STATE_WAITING));
        }
        try {
            orderRecord.getBucket().updateState();
        } catch (Exception e) {
            throw new BaseException(new ApiError(BucketError.UPDATE_BUCKET_STATE_ERROR));
        }
    }

    @Transactional
    public Long updateOrderRefused(Long orderId) {
        OrderRecord orderRecord = orderService.getOrderRecord(orderId);
        try {
            orderRecord.updateOrderState(OrderState.REFUSED);
            return orderRecord.getStoreId();
        } catch (Exception e) {
            throw new BaseException(new ApiError(OrderError.FAILED_UPDATE_STATE_REFUSED));
        }
    }

    @Transactional
    public OrderFromFundingResponse createOrderAboutFunding(Long fundingId) {
        Funding funding = fundingRepository.findById(fundingId).orElseThrow(
                () -> new BaseException(new ApiError(FundingError.NOT_EXIST_FUNDING)));
        Integer orderCount = orderRepository.countOrdersByStoreId(funding.getStoreId(),
                LocalDateTime.now());
        Bucket bucket = funding.getBucket();
        try {
            OrderRecord orderRecord = orderRepository.save(
                    new OrderRecord(funding, orderCount, bucket));
            return new OrderFromFundingResponse(orderRecord.getOrderId(), funding.getStoreId());
        } catch (Exception e) {
            throw new BaseException(new ApiError(OrderError.FAILED_CREATE_ORDER));
        }
    }

    @Transactional
    public void updateOrderAboutFunding(Long fundingId, Long orderId) {
        OrderRecord orderRecord = orderService.getOrderRecord(orderId);
        Funding funding = fundingRepository.findById(fundingId).orElseThrow(
                () -> new BaseException(new ApiError(FundingError.NOT_EXIST_FUNDING)));
        try {
            orderRecord.updateOrderState(OrderState.WAITING);
        } catch (Exception e) {
            throw new BaseException(new ApiError(OrderError.FAILED_UPDATE_STATE_WAITING));
        }
        try {
            funding.updateOrderStateComplete();
        } catch (Exception e) {
            throw new BaseException(new ApiError(FundingError.FAILED_UPDATE_STATE_ORDER_COMPLETED));
        }
    }

    public Long getStoreId(Long orderId) {
        Long storeId = orderRepository.findById(orderId).get().getStoreId();
        return storeId;
    }

    @Transactional
    public List<MenuPerOrderResponse> getMenusPerOrders(List<Long> orders) {
        List<MenuPerOrderResponse> menuPerOderResponseList = new ArrayList<>();

        for (Long orderId : orders) {
            OrderRecord orderRecord = orderService.getOrderRecord(orderId);
            Bucket bucket = orderRecord.getBucket();
            List<String> menuList = orderService.getOrderMenus(bucket);
            menuPerOderResponseList.add(new MenuPerOrderResponse(orderId, menuList));
        }
        return menuPerOderResponseList;
    }

    public List<OrderPerUser> getOrderPerUser() {
        int previousMonth = LocalDate.now().minusMonths(1).getMonthValue();
        List<Object[]> orderPerUserList = orderRepository.countOrdersByUserId(previousMonth);
        return orderPerUserList.stream()
                .map(OrderPerUser -> new OrderPerUser((Long) OrderPerUser[0],
                        ((Long) OrderPerUser[1]).intValue())).collect(Collectors.toList());
    }

    // 매월 1일 00:00에 구동
    @Scheduled(cron = "0 0 0 1 * ?", zone = "Asia/Seoul")
//    //1분 마다 실행 ex) 00:01, 00:02 ...
//    @Scheduled(cron = "0 0/1 * * * *")
    public void run() {
        List<OrderPerUser> orderPerUserList = getOrderPerUser();
        try {
            // 직렬화할 객체 생성
            GradeUpdateRequest gradeUpdateRequest = GradeUpdateRequest.builder()
                    .gradeUpdateRequests(orderPerUserList).build();
            // 객체를 JSON 문자열로 직렬화
            String gradeUpdateRequestJson = objectMapper.writeValueAsString(gradeUpdateRequest);
            kafkaTemplate.send("order-service-update-user", gradeUpdateRequestJson);
        } catch (Exception e) {
            e.printStackTrace();
            throw new BaseException(new ApiError(OrderError.FAILED_KAFKA));
        }
    }

    @Transactional
    public void deleteOrder(Long orderId) {
        OrderRecord orderRecord = orderService.getOrderRecord(orderId);
        orderRepository.delete(orderRecord);
    }
}
