package com.sff.OrderServer.order.service;

import com.sff.OrderServer.bucket.entity.Bucket;
import com.sff.OrderServer.bucket.entity.OrderMenu;
import com.sff.OrderServer.bucket.entity.OrderOption;
import com.sff.OrderServer.bucket.repository.BucketRepository;
import com.sff.OrderServer.bucket.repository.OrderMenuRepository;
import com.sff.OrderServer.error.code.BucketError;
import com.sff.OrderServer.error.code.OrderError;
import com.sff.OrderServer.error.type.BaseException;
import com.sff.OrderServer.order.dto.OrderCreateRequest;
import com.sff.OrderServer.order.dto.OrderMenuResponse;
import com.sff.OrderServer.order.dto.OrderOptionResponse;
import com.sff.OrderServer.order.dto.OrderRecordOfState;
import com.sff.OrderServer.order.dto.OrderRecordResponse;
import com.sff.OrderServer.order.entity.OrderRecord;
import com.sff.OrderServer.order.entity.OrderState;
import com.sff.OrderServer.order.repository.OrderRecordRepository;
import com.sff.OrderServer.utils.ApiError;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class OrderService {

    private final OrderRecordRepository orderRepository;
    private final BucketRepository bucketRepository;
    private final OrderMenuRepository orderMenuRepository;

    @Transactional
    public void createOrder(OrderCreateRequest orderCreateRequest, Long userId) {
        Integer orderCount = orderRepository.countOrdersByStoreId(orderCreateRequest.getStoreId(), LocalDateTime.now());
        Bucket bucket = getBucket(orderCreateRequest.getBucketId());
        try {
            orderRepository.save(new OrderRecord(orderCreateRequest, orderCount, bucket, userId));
        } catch (Exception e) {
            throw new BaseException(new ApiError(OrderError.FAILED_CREATE_ORDER));
        }
    }

    public List<OrderRecordResponse> getOrderRecords(Long userId) {
        List<OrderRecordResponse> orderResponseList = new ArrayList<>();
        List<OrderRecord> orderRecordList = orderRepository.findAllByUserIdOrderByCreatedAtDesc(
                userId);
        for (OrderRecord orderRecord : orderRecordList) {
            Bucket bucket = orderRecord.getBucket();
            // 가게 정보(가게 이름, 가게 이미지, 가게 주소) 요청 후 밑으로 넘겨주기 필요
            OrderRecordResponse orderRecordResponse = new OrderRecordResponse(orderRecord,
                    getOrderMenus(bucket));
            orderResponseList.add(orderRecordResponse);
        }
        return orderResponseList;
    }

    public OrderRecordResponse getOrderRecordDetail(Long orderId) {
        OrderRecord orderRecord = getOrderRecord(orderId);
        Bucket bucket = orderRecord.getBucket();
        // 가게 정보(가게 이름, 가게 이미지, 가게 주소) 요청 후 밑으로 넘겨주기 필요
        return new OrderRecordResponse(orderRecord, getOrderMenus(bucket));
    }

    // 바구니에 들은 주문 메뉴, 옵션
    private List<OrderMenuResponse> getOrderMenus(Bucket bucket) {
        List<OrderMenu> orderMenuList = orderMenuRepository.findAllByBucket(bucket);
        List<OrderMenuResponse> orderMenuResponseList = new ArrayList<>();
        for (OrderMenu orderMenu : orderMenuList) {
            List<OrderOptionResponse> orderOptionResponseList = getOrderOptions(orderMenu);
            int menuTotalPrice = calMenuAndOption(orderMenu, orderOptionResponseList);
            orderMenuResponseList.add(
                    new OrderMenuResponse(orderMenu, orderOptionResponseList, menuTotalPrice));
        }
        return orderMenuResponseList;
    }

    // 메뉴에 달린 옵션
    private List<OrderOptionResponse> getOrderOptions(OrderMenu orderMenu) {
        List<OrderOption> orderOptionList = orderMenu.getOptions();
        List<OrderOptionResponse> orderOptionResponseList = new ArrayList<>();
        for (OrderOption orderOption : orderOptionList) {
            orderOptionResponseList.add(new OrderOptionResponse(orderOption));
        }
        return orderOptionResponseList;
    }

    // 해당 메뉴에 대한 총 합 계산
    private int calMenuAndOption(OrderMenu orderMenu,
            List<OrderOptionResponse> orderOptionResponseList) {
        int menuTotalPrice = 0;
        for (OrderOptionResponse orderOptionResponse : orderOptionResponseList) {
            menuTotalPrice += orderOptionResponse.getPrice();
        }
        return (menuTotalPrice + orderMenu.getPrice()) * orderMenu.getCount();
    }

    public List<OrderRecordOfState> getWaitingOrders(Long storeId) {
        List<OrderRecordOfState> waitingOrderList = new ArrayList<>();
        List<OrderRecord> watingOrderRecordList = orderRepository.findCurrentOrdersByDate(storeId,
                OrderState.WAITING, LocalDateTime.now());
        for (OrderRecord orderRecord : watingOrderRecordList) {
            Bucket bucket = orderRecord.getBucket();
            OrderRecordOfState orderRecordOfState = new OrderRecordOfState(orderRecord,
                    getOrderMenus(bucket));
            waitingOrderList.add(orderRecordOfState);
        }
        return waitingOrderList;
    }

    public List<OrderRecordOfState> getProcessingOrders(Long storeId) {
        List<OrderRecordOfState> processingOrderList = new ArrayList<>();
        List<OrderRecord> processingOrderRecordList = orderRepository.findCurrentOrdersByDate(storeId,
                OrderState.PROCESSING, LocalDateTime.now());
        for (OrderRecord orderRecord : processingOrderRecordList) {
            Bucket bucket = orderRecord.getBucket();
            OrderRecordOfState orderRecordOfState = new OrderRecordOfState(orderRecord,
                    getOrderMenus(bucket));
            processingOrderList.add(orderRecordOfState);
        }
        return processingOrderList;
    }

    public List<OrderRecordOfState> getCompletedOrders(Long storeId) {
        List<OrderRecordOfState> completedOrderList = new ArrayList<>();
        List<OrderRecord> completedOrderRecordList = orderRepository.findCurrentOrdersByDate(storeId,
                OrderState.COMPLETED, LocalDateTime.now());
        for (OrderRecord orderRecord : completedOrderRecordList) {
            Bucket bucket = orderRecord.getBucket();
            OrderRecordOfState orderRecordOfState = new OrderRecordOfState(orderRecord,
                    getOrderMenus(bucket));
            completedOrderList.add(orderRecordOfState);
        }
        return completedOrderList;
    }

    public List<OrderRecordOfState> getAllOrders(Long storeId) {
        List<OrderRecordOfState> allOrderList = new ArrayList<>();
        List<OrderRecord> allOrderRecordList = orderRepository.findAllByStoreIdOrderByCreatedAtDesc(storeId);
        for (OrderRecord orderRecord : allOrderRecordList) {
            Bucket bucket = orderRecord.getBucket();
            OrderRecordOfState orderRecordOfState = new OrderRecordOfState(orderRecord,
                    getOrderMenus(bucket));
            allOrderList.add(orderRecordOfState);
        }
        return allOrderList;
    }

    private Bucket getBucket(Long bucketId) {
        return bucketRepository.findById(bucketId).orElseThrow(
                () -> new BaseException(new ApiError(BucketError.NON_EXIST_BUCKET_USER))
        );
    }

    private OrderRecord getOrderRecord(Long orderId) {
        return orderRepository.findById(orderId).orElseThrow(
                () -> new BaseException(new ApiError(OrderError.NON_EXIST_ORDER))
        );
    }

}
