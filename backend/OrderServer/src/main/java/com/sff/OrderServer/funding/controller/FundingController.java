package com.sff.OrderServer.funding.controller;

import com.sff.OrderServer.funding.dto.FundingRequest;
import com.sff.OrderServer.funding.service.FundingService;
import com.sff.OrderServer.utils.ApiResult;
import com.sff.OrderServer.utils.ApiUtils;
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
public class FundingController {
    private final FundingService fundingService;

    @PostMapping("/api/order-server/user/fundings")
    public ApiResult<?> createFunding(@RequestHeader("userId") Long userId, @RequestBody FundingRequest fundingRequest){
        fundingService.createFunding(userId, fundingRequest);
        return ApiUtils.success("펀딩 정보 저장");
    }

    @GetMapping("/api/order-server/user/fundings")
    public ApiResult<?> getFundings(@RequestHeader("userId") Long userId){
        return ApiUtils.success(fundingService.getFundings(userId));
    }

    @GetMapping("/api/order-server/user/fundings/{fundingId}")
    public ApiResult<?> getFunding(@RequestHeader("userId") Long userId, @PathVariable Long fundingId){
        return ApiUtils.success(fundingService.getFunding(userId, fundingId));
    }

    @PutMapping("/api/order-server/user/fundings/order-state/cancel/{fundingId}")
    public ApiResult<?> updateFunding(@RequestHeader("userId") Long userId, @PathVariable Long fundingId){
        fundingService.updateFundingOrderStateCancled(userId, fundingId);
        return ApiUtils.success("펀딩 주문 상태 취소로 변경 완료");
    }

}
