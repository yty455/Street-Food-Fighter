package com.sff.OrderServer.funding.controller;

import com.sff.OrderServer.funding.dto.FundingRequest;
import com.sff.OrderServer.funding.service.FundingService;
import com.sff.OrderServer.utils.ApiResult;
import com.sff.OrderServer.utils.ApiUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class FundingController {
    private final FundingService fundingService;

    @PostMapping("/api/order-server/user/funding")
    public ApiResult<?> createFunding(@RequestHeader("userId") Long userId, @RequestBody FundingRequest fundingRequest){
        fundingService.createFunding(userId, fundingRequest);
        return ApiUtils.success("펀딩 정보 저장");
    }
}
