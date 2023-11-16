package com.sff.userserver.domain.point.controller;

import com.sff.userserver.domain.common.annotation.UserIdRequired;
import com.sff.userserver.domain.common.aspect.UserIdHolder;
import com.sff.userserver.domain.point.dto.PaymentPasswordResponse;
import com.sff.userserver.domain.point.dto.PointAmountResponse;
import com.sff.userserver.domain.point.dto.PointUpdateRequest;
import com.sff.userserver.domain.point.service.PointService;
import com.sff.userserver.global.utils.ApiResult;
import com.sff.userserver.global.utils.ApiUtils;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user-server")
public class PointController {
    private final PointService pointService;

    @GetMapping("/me/points")
    @UserIdRequired
    public ApiResult<?> getMyPoint(UserIdHolder userIdHolder) {
        PointAmountResponse myPoint = pointService.getMyPoint(userIdHolder.getUserId());
        return ApiUtils.success(myPoint);
    }

    @PutMapping("/{memberId}/points")
    public ApiResult<?> updatePoint(@PathVariable Long memberId, @Valid @RequestBody PointUpdateRequest pointUpdateRequest) {
        pointService.updatePoint(memberId, pointUpdateRequest);
        return ApiUtils.success("포인트 업데이트 성공");
    }

    @GetMapping("/me/payment-password")
    @UserIdRequired
    public ApiResult<?> getPaymentPassword(UserIdHolder userIdHolder) {
        PaymentPasswordResponse paymentPassword = pointService.getPaymentPassword(userIdHolder.getUserId());
        return ApiUtils.success(paymentPassword);
    }

    @PutMapping("/points")
    @UserIdRequired
    public ApiResult<?> updatePoint(UserIdHolder userIdHolder, @Valid @RequestBody PointUpdateRequest pointUpdateRequest) {
        pointService.updatePoint(userIdHolder.getUserId(), pointUpdateRequest);
        return ApiUtils.success("포인트 업데이트 성공");
    }
}
