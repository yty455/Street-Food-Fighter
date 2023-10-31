package com.sff.OrderServer.order.service;

import com.sff.OrderServer.bucket.entity.Bucket;
import com.sff.OrderServer.bucket.entity.OrderMenu;
import com.sff.OrderServer.bucket.entity.OrderOption;
import com.sff.OrderServer.bucket.repository.BucketRepository;
import com.sff.OrderServer.bucket.repository.OrderMenuRepository;
import com.sff.OrderServer.bucket.repository.OrderOptionRepository;
import com.sff.OrderServer.error.code.OrderError;
import com.sff.OrderServer.error.type.BaseException;
import com.sff.OrderServer.order.dto.OrderCreateRequest;
import com.sff.OrderServer.order.dto.OrderResponse;
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
    private final OrderOptionRepository orderOptionRepository;

    @Transactional
    public void createOrder(OrderCreateRequest orderCreateRequest) {
        Integer orderCount = orderRepository.countOrdersByStoreId(orderCreateRequest.getStoreId());
        // 장바구니 찾는 코드
        try {
            orderRepository.save(OrderRecord.toEntity(orderCreateRequest, orderCount));
        } catch (Exception e) {
            throw new BaseException(new ApiError(OrderError.FAILED_CREATE_ORDER));
        }
    }

    public List<OrderResponse> getOrders(Long userId) {
        List<OrderResponse> orderResponseList = new ArrayList<>();
        List<OrderRecord> orderRecordListrList = orderRepository.findAllByUserId(userId);
        for (OrderRecord orderRecord: orderRecordListrList) {
            // 주문 바구니
            Bucket bucket = bucketRepository.findById(orderRecord.getBucket().getBucketId()).get();
            // 바구니에 들은 주문 메뉴, 옵션
            List<OrderMenu> orderMenuList = orderMenuRepository.findAllByBucketId(bucket.getBucketId());
            for (OrderMenu orderMenu : orderMenuList) {
                List<OrderOption> orderOptionList = orderOptionRepository.findAllByMenuId(orderMenu.getOrderMenuId());
            }
        }
        return orderResponseList;
    }
}
