package com.sff.OrderServer.order.controller;

import com.sff.OrderServer.order.dto.OrderCreateRequest;
import com.sff.OrderServer.order.service.OrderService;
import com.sff.OrderServer.utils.ApiResult;
import com.sff.OrderServer.utils.ApiUtils;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    // 주문 추가
    @PostMapping("/api/order-server/orders")
    public ApiResult<?> createOrder(@RequestHeader("UserId") Long userId,
            @RequestBody OrderCreateRequest orderCreateRequest) {
        return ApiUtils.success(orderService.createOrder(orderCreateRequest, userId));
    }

    // 주문 내역 조회
    @GetMapping("/api/order-server/orders")
    public ApiResult<?> getOrders(@RequestHeader("UserId") Long userId) {
        return ApiUtils.success(orderService.getOrderRecords(userId));
    }

    // 주문 확인 (상세 조회)
    @GetMapping("/api/order-server/orders/{orderId}")
    public ApiResult<?> getOrder(@PathVariable Long orderId) {
        return ApiUtils.success(orderService.getOrderRecordDetail(orderId));
    }

    // 주문 목록 조회-접수대기
    @GetMapping("/api/order-server/orders-waiting")
    public ApiResult<?> getWaitingOrders(@RequestHeader("StoreId") Long storeId) {
        return ApiUtils.success(orderService.getWaitingOrders(storeId));
    }

    // 주문 목록 조회-처리중
    @GetMapping("/api/order-server/orders-processing")
    public ApiResult<?> getProcessingOrders(@RequestHeader("StoreId") Long storeId) {
        return ApiUtils.success(orderService.getProcessingOrders(storeId));
    }

    // 주문 목록 조회-완료
    @GetMapping("/api/order-server/order-completion")
    public ApiResult<?> getCompletedOrders(@RequestHeader("StoreId") Long storeId) {
        return ApiUtils.success(orderService.getCompletedOrders(storeId));
    }

    // 주문 목록 조회-전체 일자별
    @GetMapping("/api/order-server/owner/orders")
    public ApiResult<?> getAllOrders(@RequestHeader("StoreId") Long storeId) {
        return ApiUtils.success(orderService.getAllOrders(storeId));
    }

    // 주문 상세 조회
    @GetMapping("/api/order-server/owner/order/{orderId}")
    public ApiResult<?> getOrderDetail(@PathVariable Long orderId) {
        return ApiUtils.success(orderService.getOwnerOrderDetail(orderId));
    }

    // 주문 상태 변경 - 주문 대기
    @PutMapping("/api/order-server/state-waiting/{orderId}")
    public ApiResult<?> updateOrderWaiting(@PathVariable Long orderId) {
        orderService.updateOrderWaiting(orderId);
        return ApiUtils.success("주문을 완료하였습니다.");
    }

    // 주문 상태 변경 - 조리중
    @PutMapping("/api/order-server/state-processing/{orderId}")
    public ApiResult<?> updateOrderProcessing(@PathVariable Long orderId) {
        orderService.updateOrderProcessing(orderId);
        return ApiUtils.success("주문을 접수하였습니다.");
    }

    // 주문 상태 변경 - 조리 완료
    @PutMapping("/api/order-server/state-completion/{orderId}")
    public ApiResult<?> updateOrderCompleted(@PathVariable Long orderId) {
        orderService.updateOrderCompleted(orderId);
        return ApiUtils.success("조리를 완료 하였습니다.");
    }

    // 리뷰 요청 상태 변경- 리뷰 요청 완료
    @PutMapping("/api/order-server/state-request/{orderId}")
    public ApiResult<?> updateOrderRequest(@PathVariable Long orderId) {
        orderService.updateOrderRequest(orderId);
        return ApiUtils.success("리뷰 요청을 완료 하였습니다.");
    }

    // 주문 상태 변경 - 거절됨
    @PutMapping("/api/order-server/state-refused/{orderId}")
    public ApiResult<?> updateOrderRefused(@PathVariable Long orderId) {
        return ApiUtils.success(orderService.updateOrderRefused(orderId));
    }

    // 펀딩 - 주문 추가
    @PostMapping("/api/order-server/orders/funding-to-order/{fundingId}")
    public ApiResult<?> createOrderAboutFunding(@PathVariable Long fundingId) {
        return ApiUtils.success(orderService.createOrderAboutFunding(fundingId));
    }

    // 주문 상태 변경 + 펀딩 주문 상태 변경
    @PutMapping("/api/order-server/funding-to-order/{fundingId}/state-waiting/{orderId}")
    public ApiResult<?> updateOrderAboutFunding(@PathVariable Long fundingId,
            @PathVariable Long orderId) {
        orderService.updateOrderAboutFunding(fundingId, orderId);
        return ApiUtils.success("펀딩에 대한 주문 상태를 변경하였습니다.");
    }

    // 주문 Id에 해당하는 주문의 가게 Id 조회
    @GetMapping("/api/order-server/{orderId}")
    public ApiResult<?> getStoreId(@PathVariable Long orderId) {
        return ApiUtils.success(orderService.getStoreId(orderId));
    }

    // 주문별 메뉴 목록
    @PostMapping("/api/order-server/menus")
    public ApiResult<?> getMenusPerOrders(@RequestBody List<Long> orders) {
        return ApiUtils.success(orderService.getMenusPerOrders(orders));
    }

    // 회원별 이전 달 주문 수
    @GetMapping("/api/order-server/orders/counts")
    public ApiResult<?> getOrderPerUser() {
        return ApiUtils.success(orderService.getOrderPerUser());
    }

    // 영업 종료 - 메뉴명 / 판매수 / 옵션 포함 판매 금액
    @GetMapping("/api/order-server/orders/stats")
    public ApiResult<?> getStats(@RequestHeader("StoreId") Long storeId) {
        return ApiUtils.success(orderService.getStats(storeId));
    }
}
