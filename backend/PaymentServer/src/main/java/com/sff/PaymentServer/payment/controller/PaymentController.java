package com.sff.PaymentServer.payment.controller;

import com.sff.PaymentServer.dto.FundingCreateRequest;
import com.sff.PaymentServer.dto.OrderCreateRequest;
import com.sff.PaymentServer.payment.service.FundingPaymentService;
import com.sff.PaymentServer.payment.service.OrderPaymentService;
import com.sff.PaymentServer.utils.ApiResult;
import com.sff.PaymentServer.utils.ApiUtils;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class PaymentController {
    private final OrderPaymentService orderPaymentService;
    private final FundingPaymentService fundingPaymentService;

    @PostMapping("/api/payment-server/orders")
    public ApiResult<?> createOrderPayment(@RequestHeader("userId") Long userId, @RequestBody
            OrderCreateRequest orderCreateRequest){
        orderPaymentService.createOrderPayment(userId, orderCreateRequest);
        return ApiUtils.success("주문 결제 성공");
    }

    @PostMapping("/api/payment-server/fundings")
    public ApiResult<?> createFundingPayment(@RequestHeader("userId") Long userId, @RequestBody FundingCreateRequest fundingCreateRequest){
        fundingPaymentService.createFundingPayment(userId, fundingCreateRequest);
        return ApiUtils.success("펀딩 결제 성공");
    }

    @PostMapping("/api/payment-server/orders/funding/{fundingId}")
    public ApiResult<?> createFundingToOrder(@RequestHeader("userId") Long userId, @PathVariable Long fundingId){

        return ApiUtils.success("펀딩을 통한 주문 성공");
    }

    @PutMapping("/api/payment_server/fundings/{fundingId}/cancel")
    public ApiResult<?> updateFundingCancel(@RequestHeader("userId") Long userId, @PathVariable Long fundingId){

        return ApiUtils.success("펀딩을 통한 주문 성공");
    }

    @PutMapping("/api/payment_server/orders/{orderId}/reject")
    public ApiResult<?> updateOrderReject(@RequestHeader("userId") Long userId, @PathVariable Long orderId){

        return ApiUtils.success("펀딩을 통한 주문 성공");
    }

    @PutMapping("/api/payment_server/fundings/flags/refund")
    public ApiResult<?> updateFundingsRefund(@RequestHeader("userId") Long userId, @RequestBody List<Long> flags){

        return ApiUtils.success("펀딩을 통한 주문 성공");
    }
}
