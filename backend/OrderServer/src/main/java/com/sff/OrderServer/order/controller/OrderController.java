package com.sff.OrderServer.order.controller;

import com.sff.OrderServer.order.dto.OrderCreateRequest;
import com.sff.OrderServer.order.service.OrderService;
import com.sff.OrderServer.utils.ApiResult;
import com.sff.OrderServer.utils.ApiUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping("/api/order-server/user/orders")
    public ApiResult<?> createOrder(@RequestHeader("userId") Long userId,
            @RequestBody OrderCreateRequest orderCreateRequest) {
        orderService.createOrder(orderCreateRequest, userId);
        return ApiUtils.success("성공적으로 주문을 등록하였습니다.");
    }

    @GetMapping("/api/order-server/user/orders")
    public ApiResult<?> getOrders(@RequestHeader("userId") Long userId) {
        return ApiUtils.success(orderService.getOrderRecords(userId));
    }

    @GetMapping("/api/order-server/user/orders/{orderId}")
    public ApiResult<?> getOrder(@PathVariable Long orderId) {
        return ApiUtils.success(orderService.getOrderRecordDetail(orderId));
    }

    @GetMapping("/api/order-server/owner/waitings/{storeId}")
    public ApiResult<?> getWaitingOrders(@PathVariable Long storeId) {
        return ApiUtils.success(orderService.getWaitingOrders(storeId));
    }

    @GetMapping("/api/order-server/owner/processings/{storeId}")
    public ApiResult<?> getProcessingOrders(@PathVariable Long storeId) {
        return ApiUtils.success(orderService.getProcessingOrders(storeId));
    }

    @GetMapping("/api/order-server/owner/completions/{storeId}")
    public ApiResult<?> getCompletedOrders(@PathVariable Long storeId) {
        return ApiUtils.success(orderService.getCompletedOrders(storeId));
    }
}
