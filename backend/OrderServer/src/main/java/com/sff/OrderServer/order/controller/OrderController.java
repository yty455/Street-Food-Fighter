package com.sff.OrderServer.order.controller;

import com.sff.OrderServer.order.dto.OrderCreateRequest;
import com.sff.OrderServer.order.service.OrderService;
import com.sff.OrderServer.utils.ApiResult;
import com.sff.OrderServer.utils.ApiUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class OrderController {
    private final OrderService orderService;
    @PostMapping("/api/order-server/user/order")
    public ApiResult<?> createOrder(@RequestBody OrderCreateRequest orderCreateRequest) {
        orderService.createOrder(orderCreateRequest);
        return ApiUtils.success("성공적으로 주문을 등록하였습니다.");
    }

    @GetMapping("/api/order-server/user/order")
    public ApiResult<?> getOrders(Long userId){
        return ApiUtils.success(orderService.getOrders(userId));
    }

}
