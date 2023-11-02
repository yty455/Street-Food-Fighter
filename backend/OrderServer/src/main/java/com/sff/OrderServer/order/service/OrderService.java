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
import com.sff.OrderServer.order.dto.OrderRecordResponse;
import com.sff.OrderServer.order.entity.OrderRecord;
import com.sff.OrderServer.order.repository.OrderRepository;
import com.sff.OrderServer.utils.ApiError;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class OrderService {

    private final OrderRepository orderRepository;
    private final BucketRepository bucketRepository;
    private final OrderMenuRepository orderMenuRepository;

    @Transactional
    public void createOrder(OrderCreateRequest orderCreateRequest, Long userId) {
        Integer orderCount = orderRepository.countOrdersByStoreId(orderCreateRequest.getStoreId());
        Bucket bucket = getBucket(orderCreateRequest.getBucketId());
        try {
            orderRepository.save(new OrderRecord(orderCreateRequest, orderCount, bucket, userId));
        } catch (Exception e) {
            throw new BaseException(new ApiError(OrderError.FAILED_CREATE_ORDER));
        }
    }

    public List<OrderRecordResponse> getOrderRecords(Long userId) {
        List<OrderRecordResponse> orderResponseList = new ArrayList<>();
        List<OrderRecord> orderRecordList = orderRepository.findAllByUserIdOrderByOrderDate(userId);
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
            orderMenuResponseList.add(new OrderMenuResponse(orderMenu, getOrderOptions(orderMenu)));
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
