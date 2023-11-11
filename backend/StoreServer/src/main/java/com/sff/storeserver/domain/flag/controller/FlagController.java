package com.sff.storeserver.domain.flag.controller;

import com.sff.storeserver.common.aop.UserIdHolder;
import com.sff.storeserver.common.aop.UserIdRequired;
import com.sff.storeserver.common.utils.ApiResult;
import com.sff.storeserver.common.utils.ApiUtils;
import com.sff.storeserver.domain.flag.dto.FlagDetailResponse;
import com.sff.storeserver.domain.flag.dto.FlagRequest;
import com.sff.storeserver.domain.flag.dto.FlagResponse;
import com.sff.storeserver.domain.flag.service.FlagService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/store-service")
@RequiredArgsConstructor
public class FlagController {
    private final FlagService flagService;

    @Operation(summary = "사장 - 깃발 등록", description = "사장이 지정한 위치에 깃발을 등록 합니다.")
    @PostMapping("/flags")
    @UserIdRequired
    public ApiResult<?> registerFlag(UserIdHolder userIdHolder, @Valid @RequestBody FlagRequest flagRequest) {
        Long flagId = flagService.createFlag(userIdHolder.getUserId(), flagRequest);
        return ApiUtils.success(flagId);
    }

    @Operation(summary = "사장 - 깃발 조회", description = "사장이 선택한 날짜의 깃발을 조회 합니다..")
    @GetMapping("/store/flags")
    @UserIdRequired
    public ApiResult<?> getFlags(UserIdHolder userIdHolder, @RequestParam @Parameter(name = "date", description = "조회할 날짜") LocalDate date) {
        List<FlagResponse> flagResponses = flagService.getFlags(userIdHolder.getUserId(), date);
        return ApiUtils.success(flagResponses);
    }

    @Operation(summary = "사장 - 깃발 상세 조회", description = "깃발의 상세 정보를 조회 합니다.")
    @GetMapping("/store/{storeId}/flags/{flagId}")
    @UserIdRequired
    public ApiResult<?> getFlagDetail(UserIdHolder userIdHolder, @PathVariable("flagId") Long flagId) {
        FlagDetailResponse flagDetailResponse = flagService.getFlagDetail(userIdHolder.getUserId(), flagId);
        return ApiUtils.success(flagDetailResponse);
    }
}
