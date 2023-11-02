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

    // 펀딩 추가
    @PostMapping("/api/order-server/fundings")
    public ApiResult<?> createFunding(@RequestHeader("userId") Long userId, @RequestBody FundingRequest fundingRequest){
        fundingService.createFunding(userId, fundingRequest);
        return ApiUtils.success("펀딩 정보 저장");
    }

    // 펀딩 내역 조회
    @GetMapping("/api/order-server/fundings")
    public ApiResult<?> getFundings(@RequestHeader("userId") Long userId){
        return ApiUtils.success(fundingService.getFundings(userId));
    }

    // 펀딩 내역 상세 조회
    @GetMapping("/api/order-server/fundings/{fundingId}")
    public ApiResult<?> getFunding(@RequestHeader("userId") Long userId, @PathVariable Long fundingId){
        return ApiUtils.success(fundingService.getFunding(userId, fundingId));
    }

    // 펀딩 주문 상태 변경 - 취소
    @PutMapping("/api/order-server/fundings/{fundingId}/order-state/cancel")
    public ApiResult<?> updateFundingCancel(@RequestHeader("userId") Long userId, @PathVariable Long fundingId){
        fundingService.updateFundingOrderStateCancled(userId, fundingId);
        return ApiUtils.success("펀딩 주문 상태 취소로 변경 완료");
    }

    // -------msa--------
    // 펀딩 주문 상태 변경 - 주문 완료
    @PutMapping("/api/order-server/fundings/{fundingId}/order-state/complete")
    public ApiResult<?> updateFundingComplete(@RequestHeader("userId") Long userId, @PathVariable Long fundingId){
        fundingService.updateFundingOrderStateComplete(userId, fundingId);
        return ApiUtils.success("펀딩 주문 상태 취소로 변경 완료");
    }
    // 펀딩 주문 상태 변경 - 주문 전 (error 발생 시 rollback을 위한 API)
    @PutMapping("/api/order-server/fundings/{fundingId}/order-state/before")
    public ApiResult<?> updateFundingBefore(@RequestHeader("userId") Long userId, @PathVariable Long fundingId){
        fundingService.updateFundingOrderStateBefore(userId, fundingId);
        return ApiUtils.success("펀딩 주문 상태 주문 전으로 변경 완료");
    }

    // 펀딩 상태 변경 - 성공
    @PutMapping("/api/order-server/fundings/{fundingId}/funding-state/success")
    public ApiResult<?> updateFundingSuccess(@RequestHeader("userId") Long userId, @PathVariable Long fundingId){
        fundingService.updateFundingStateSuccess(userId, fundingId);
        return ApiUtils.success("펀딩 상태 성공으로 변경 완료");
    }
    // 펀딩 상태 변경 - 실패
    @PutMapping("/api/order-server/fundings/{fundingId}/funding-state/fail")
    public ApiResult<?> updateFundingFailure(@RequestHeader("userId") Long userId, @PathVariable Long fundingId){
        fundingService.updateFundingStateFailure(userId, fundingId);
        return ApiUtils.success("펀딩 상태 실패로 변경 완료");
    }
    // 펀딩 상태 변경 - 대기 (error 발생 시 rollback을 위한 API)
    @PutMapping("/api/order-server/fundings/funding-state/waiting/{fundingId}")
    public ApiResult<?> updateFundingWaiting(@RequestHeader("userId") Long userId, @PathVariable Long fundingId){
        fundingService.updateFundingStateWaiting(userId, fundingId);
        return ApiUtils.success("펀딩 상태 대기로 변경 완료");
    }

}
