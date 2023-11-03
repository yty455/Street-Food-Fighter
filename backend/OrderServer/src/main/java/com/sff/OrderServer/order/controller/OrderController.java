package com.sff.OrderServer.order.controller;

import com.sff.OrderServer.order.dto.OrderCreateRequest;
import com.sff.OrderServer.order.service.OrderService;
import com.sff.OrderServer.utils.ApiResult;
import com.sff.OrderServer.utils.ApiUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
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

    @GetMapping("/api/order-server/owner/orders-waiting/{storeId}")
    public ApiResult<?> getWaitingOrders(@PathVariable Long storeId) {
        return ApiUtils.success(orderService.getWaitingOrders(storeId));
    }

    @GetMapping("/api/order-server/owner/orders-processing/{storeId}")
    public ApiResult<?> getProcessingOrders(@PathVariable Long storeId) {
        return ApiUtils.success(orderService.getProcessingOrders(storeId));
    }

    @GetMapping("/api/order-server/owner/order-completion/{storeId}")
    public ApiResult<?> getCompletedOrders(@PathVariable Long storeId) {
        return ApiUtils.success(orderService.getCompletedOrders(storeId));
    }

    @GetMapping("/api/order-server/owner/orders/{storeId}")
    public ApiResult<?> getAllOrders(@PathVariable Long storeId) {
        return ApiUtils.success(orderService.getAllOrders(storeId));
    }

    @GetMapping("/api/order-server/owner/order/{orderId}")
    public ApiResult<?> getOrderDetail(@PathVariable Long orderId) {
        return ApiUtils.success(orderService.getOwnerOrderDetail(orderId));
    }

    @PutMapping("/api/order-server/user/state-waiting/{orderId}")
    public ApiResult<?> updateOrderWaiting(@PathVariable Long orderId) {
        orderService.updateOrderWaiting(orderId);
        return ApiUtils.success("주문을 완료하였습니다.");
    }

    @PutMapping("/api/order-server/owner/state-processing/{orderId}")
    public ApiResult<?> updateOrderProcessing(@PathVariable Long orderId) {
        orderService.updateOrderProcessing(orderId);
        return ApiUtils.success("주문을 접수하였습니다.");
    }

    @PutMapping("/api/order-server/owner/state-completion/{orderId}")
    public ApiResult<?> updateOrderCompleted(@PathVariable Long orderId) {
        orderService.updateOrderCompleted(orderId);
        return ApiUtils.success("조리를 완료 하였습니다.");
    }

    @PutMapping("/api/order-server/owner/state-request/{orderId}")
    public ApiResult<?> updateOrderRequest(@PathVariable Long orderId) {
        orderService.updateOrderRequest(orderId);
        return ApiUtils.success("리뷰 요청을 완료 하였습니다.");
    }

    @PutMapping("/api/order-server/owner/state-refused/{orderId}")
    public ApiResult<?> updateOrderRefused(@PathVariable Long orderId) {
        orderService.updateOrderRefused(orderId);
        return ApiUtils.success("주문을 거절 하였습니다.");
    }

    @PostMapping("/api/order-server/orders/funding-to-order/{fundingId}")
    public ApiResult<?> createOrderAboutFunding(@RequestHeader("userId") Long userId, @PathVariable Long fundingId) {
        orderService.createOrderAboutFunding(fundingId);
        return ApiUtils.success("성공적으로 주문을 등록하였습니다.");
    }

    @PutMapping("/api/order-server/funding-to-order/{fundingId}/state-waiting/{orderId}")
    public ApiResult<?> updateOrderAboutFunding(@PathVariable Long fundingId, @PathVariable Long orderId) {
        orderService.updateOrderAboutFunding(fundingId, orderId);
        return ApiUtils.success("펀딩에 대한 주문 상태를 변경하였습니다.");
    }
}
