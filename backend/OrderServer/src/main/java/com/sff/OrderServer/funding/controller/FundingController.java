package com.sff.OrderServer.funding.controller;

import com.sff.OrderServer.funding.dto.FlagList;
import com.sff.OrderServer.funding.dto.FundingChosen;
import com.sff.OrderServer.funding.dto.FundingCreateRequest;
import com.sff.OrderServer.funding.service.FundingService;
import com.sff.OrderServer.funding.service.FundingUpdateService;
import com.sff.OrderServer.utils.ApiResult;
import com.sff.OrderServer.utils.ApiUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.DeleteMapping;
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
    private final FundingUpdateService fundingUpdateService;

    // 펀딩 추가
    @PostMapping("/api/order-server/fundings")
    public ApiResult<?> createFunding(@RequestHeader("UserId") Long userId, @RequestBody FundingCreateRequest fundingCreateRequest){
        return ApiUtils.success(fundingService.createFunding(userId, fundingCreateRequest));
    }

    // 펀딩 내역 조회
    @GetMapping("/api/order-server/fundings")
    public ApiResult<?> getFundings(@RequestHeader("UserId") Long userId){
        return ApiUtils.success(fundingService.getFundings(userId));
    }

    // 펀딩 내역 상세 조회
    @GetMapping("/api/order-server/fundings/{fundingId}")
    public ApiResult<?> getFunding(@RequestHeader("UserId") Long userId, @PathVariable Long fundingId){
        return ApiUtils.success(fundingService.getFunding(userId, fundingId));
    }

    // -------msa--------

    // 펀딩 주문 상태 변경 - 취소 : 선택된 펀딩이 주문을 하지 않고 취소한 경우
    @PutMapping("/api/order-server/fundings/{fundingId}/order-state/cancel")
    public ApiResult<?> updateFundingCancel(@RequestHeader("UserId") Long userId, @PathVariable Long fundingId){
        fundingUpdateService.updateFundingOrderStateCancled(userId, fundingId);
        return ApiUtils.success("펀딩 주문 상태 취소로 변경 완료");
    }

    // 펀딩 주문 상태 변경 - 주문 완료
    @PutMapping("/api/order-server/fundings/{fundingId}/order-state/complete")
    public ApiResult<?> updateFundingComplete(@RequestHeader("UserId") Long userId, @PathVariable Long fundingId){
        fundingUpdateService.updateFundingOrderStateComplete(userId, fundingId);
        return ApiUtils.success("펀딩 주문 상태 주문 완료로 변경 완료");
    }
    // 펀딩 주문 상태 변경 - 주문 전 (error 발생 시 rollback을 위한 API)
    @PutMapping("/api/order-server/fundings/{fundingId}/order-state/before")
    public ApiResult<?> updateFundingBefore(@RequestHeader("UserId") Long userId, @PathVariable Long fundingId){
        fundingUpdateService.updateFundingOrderStateBefore(userId, fundingId);
        return ApiUtils.success("펀딩 주문 상태 주문 전으로 변경 완료");
    }

    // 펀딩 상태 변경 - 성공
    @PutMapping("/api/order-server/fundings/{fundingId}/funding-state/success")
    public ApiResult<?> updateFundingSuccess(@RequestHeader("UserId") Long userId, @PathVariable Long fundingId){
        fundingUpdateService.updateFundingStateSuccess(userId, fundingId);
        return ApiUtils.success("펀딩 상태 성공으로 변경 완료");
    }
    // 펀딩 상태 변경 - 실패
    @PutMapping("/api/order-server/fundings/{fundingId}/funding-state/fail")
    public ApiResult<?> updateFundingFailure(@RequestHeader("UserId") Long userId, @PathVariable Long fundingId){
        fundingUpdateService.updateFundingStateFailure(userId, fundingId);
        return ApiUtils.success("펀딩 상태 실패로 변경 완료");
    }
    // 펀딩 상태 변경 - 결제 완료 시 호출
    @PutMapping("/api/order-server/fundings/{fundingId}/funding-state/waiting")
    public ApiResult<?> updateFundingWaiting(@RequestHeader("UserId") Long userId, @PathVariable Long fundingId){
        fundingService.updateFundingStateWaiting(userId, fundingId);
        return ApiUtils.success("펀딩 상태 대기 중으로 변경 및 바구니 결제 상태 true로 변경 완료");
    }

    // 깃발 별 펀딩 총 금액 요청
    @PostMapping("/api/order-server/fundings/flags")
    public ApiResult<?> getFundingAmountPerFlag(@RequestBody FlagList flags){
        return ApiUtils.success(fundingService.getFundingPerFlag(flags));
    }

    // 깃발에 펀딩한 회원들 조회
    @GetMapping("/api/order-server/fundings/flags/{flagId}/users")
    public ApiResult<?> getFundingPerUsers(@PathVariable Long flagId){
        return ApiUtils.success(fundingService.getFundingPerUsers(flagId));
    }

    // 미선택 깃발의 펀딩 리스트 조회
    @PostMapping("/api/order-server/fundings/chosen")
    public ApiResult<?> getFundingPerFlags(@RequestBody FundingChosen fundingChosen){
        return ApiUtils.success(fundingService.getUnpickedFlagFundings(fundingChosen));
    }

    // 펀딩 성공 / 실패 알림 보내기 요청
    @PutMapping("/api/order-server/fundings/chosen")
    public ApiResult<?> updateFundingStates(@RequestBody FundingChosen fundingChosen){
        fundingService.updateFundingStates(fundingChosen);
        fundingService.sendFundingResultToUsers(fundingChosen);
        return ApiUtils.success("펀딩 성공, 실패 상태 변경 완료 및 알림 전송 요청 성공");
    }

    // 펀딩 결제 실패 시 롤백을 위한 API
    @DeleteMapping("/api/order-server/fundings/{fundingId}")
    public ApiResult<?> deleteFunding(@PathVariable Long fundingId){
        fundingService.deleteFunding(fundingId);
        return ApiUtils.success("펀딩 정보 삭제. 롤백 성공");
    }

}
