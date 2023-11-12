package com.sff.PaymentServer.payment.controller;

import com.sff.PaymentServer.dto.FundingChosen;
import com.sff.PaymentServer.dto.FundingCreateRequest;
import com.sff.PaymentServer.dto.OrderCreateRequest;
import com.sff.PaymentServer.payment.service.CalculateService;
import com.sff.PaymentServer.payment.service.FundingPaymentService;
import com.sff.PaymentServer.payment.service.OrderFromFundingService;
import com.sff.PaymentServer.payment.service.OrderPaymentService;
import com.sff.PaymentServer.payment.service.RefundService;
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
    private final OrderFromFundingService orderFromFundingService;
    private final RefundService refundService;
    private final CalculateService calculateService;

    @PostMapping("/api/payment-server/orders")
    public ApiResult<?> createOrderPayment(@RequestHeader("UserId") Long userId, @RequestBody
            OrderCreateRequest orderCreateRequest){
        orderPaymentService.createOrderPayment(userId, orderCreateRequest);
        return ApiUtils.success("주문 결제 성공");
    }

    @PostMapping("/api/payment-server/fundings")
    public ApiResult<?> createFundingPayment(@RequestHeader("UserId") Long userId, @RequestBody FundingCreateRequest fundingCreateRequest){
        fundingPaymentService.createFundingPayment(userId, fundingCreateRequest);
        return ApiUtils.success("펀딩 결제 성공");
    }

    @PostMapping("/api/payment-server/orders/funding/{fundingId}")
    public ApiResult<?> createFundingToOrder(@PathVariable Long fundingId){
        orderFromFundingService.orderFromFunding(fundingId);
        return ApiUtils.success("펀딩을 통한 주문 성공");
    }

    @PutMapping("/api/payment_server/fundings/{fundingId}/cancel")
    public ApiResult<?> updateFundingCancel(@PathVariable Long fundingId){
        orderFromFundingService.cancelFromFunding(fundingId);
        return ApiUtils.success("90퍼센트 환불의 펀딩 취소 성공");
    }

    @PutMapping("/api/payment_server/orders/{orderId}/reject")
    public ApiResult<?> updateOrderReject(@RequestHeader("UserId") Long userId, @PathVariable Long orderId){
        refundService.refundFromReject(orderId);
        return ApiUtils.success("주문 접수 거절에 따른 환불 처리 완료");
    }

    // ---MSA---
    @PutMapping("/api/payment_server/flags/chosen")
    public ApiResult<?> updateFundingsChosen(@RequestBody FundingChosen flags){
        refundService.updateUnpickedFundingsRefundAndAllFlagsState(flags);
        return ApiUtils.success("미선택 깃발의 펀딩 환불 처리 및 전체 펀딩들의 선택, 미선택에 따른 상태 변경 및 알림 요청 완료");
    }

    @PutMapping("/api/payment_server/calculation")
    public ApiResult<?> updatePaymentState(@RequestHeader("UserId") Long ownerId){
        calculateService.calculatePayment(ownerId);
        return ApiUtils.success("정산 완료");
    }

}
