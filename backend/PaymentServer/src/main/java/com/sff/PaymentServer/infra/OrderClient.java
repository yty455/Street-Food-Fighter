package com.sff.PaymentServer.infra;

import com.sff.PaymentServer.dto.FundingChosen;
import com.sff.PaymentServer.dto.FundingCreateRequest;
import com.sff.PaymentServer.dto.FundingCreateResponse;
import com.sff.PaymentServer.dto.FundingList;
import com.sff.PaymentServer.dto.OrderCreateRequest;
import com.sff.PaymentServer.dto.OrderCreateResponse;
import com.sff.PaymentServer.dto.OrderFromFundingResponse;
import com.sff.PaymentServer.utils.ApiResult;
import com.sff.PaymentServer.utils.ApiUtils;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

@FeignClient(name = "orderserver", url = "${spring.data.Order_Server}")
public interface OrderClient {

    // ---주문 결제---
    @PostMapping(value = "/api/order-server/orders")
    ApiResult<OrderCreateResponse> createOrderRecord(@RequestBody OrderCreateRequest orderCreateRequest);

    @PutMapping(value = "/api/order-server/state-waiting/{orderId}")
    ApiResult updateOrderState(@PathVariable Long orderId);

    // ---펀딩 결제---
    @PostMapping("/api/order-server/fundings")
    ApiResult<FundingCreateResponse> createFunding(@RequestBody FundingCreateRequest fundingCreateRequest);

    @PutMapping("/api/order-server/fundings/{fundingId}/funding-state/waiting")
    ApiResult updateFundingWaiting(@PathVariable Long fundingId);

    // ---펀딩 -> 주문---
    @PostMapping("/api/order-server/orders/funding-to-order/{fundingId}")
    ApiResult<OrderFromFundingResponse> createOrderRecordFromFunding(@PathVariable Long fundingId);

    @PutMapping("/api/order-server/funding-to-order/{fundingId}/state-waiting/{orderId}")
    ApiResult updateFundingAndOrderState(@PathVariable Long fundingId, @PathVariable Long orderId);

    // ---펀딩 -> 주문 취소---
    @PutMapping("/api/order-server/fundings/{fundingId}/order-state/cancel")
    ApiResult updateFundingCancel(@PathVariable Long fundingId);

    // ---주문 거절 ---
    @PutMapping("/api/order-server/state-refused/{orderId}")
    ApiResult<Long> updateOrderStateRefused(@PathVariable Long orderId);

    // ---미선택 깃발 펀딩들 전체 환불 및 펀딩들 상태 변경
    @PostMapping("/api/order-server/fundings/chosen")
    ApiResult<FundingList> getFundingPerFlags(@RequestBody FundingChosen fundingChosen);

    @PutMapping("/api/order-server/fundings/chosen")
    ApiResult updateFundings(@RequestBody FundingChosen fundingChosen);
}
