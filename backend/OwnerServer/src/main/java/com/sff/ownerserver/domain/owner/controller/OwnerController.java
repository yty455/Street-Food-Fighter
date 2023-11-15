package com.sff.ownerserver.domain.owner.controller;

import com.sff.ownerserver.domain.common.annotation.UserIdRequired;
import com.sff.ownerserver.domain.common.aspect.UserIdHolder;
import com.sff.ownerserver.domain.owner.dto.*;
import com.sff.ownerserver.domain.owner.service.OwnerService;
import com.sff.ownerserver.global.utils.ApiResult;
import com.sff.ownerserver.global.utils.ApiUtils;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/owner-server")
public class OwnerController {
    private final OwnerService ownerService;

    @PostMapping("/sign-up")
    public ApiResult<?> signUp(@Valid @RequestBody SignupRequest signupRequest) {
        ownerService.signUp(signupRequest);
        return ApiUtils.success("회원 가입 성공");
    }

    @DeleteMapping("/me")
    @UserIdRequired
    public ApiResult<?> deleteOwner(UserIdHolder userIdHolder) {
        ownerService.deleteOwner(userIdHolder.getUserId());
        return ApiUtils.success("회원 탈퇴 완료");
    }

    @GetMapping("/me")
    @UserIdRequired
    public ApiResult<?> getOwner(UserIdHolder userIdHolder) {
        OwnerInfoResponse owner = ownerService.getOwner(userIdHolder.getUserId());
        return ApiUtils.success(owner);
    }

    @PatchMapping("/me")
    @UserIdRequired
    public ApiResult<?> updateOwner(@RequestBody MyInfoRequest myInfoRequest, UserIdHolder userIdHolder) {
        ownerService.updateOwner(userIdHolder.getUserId(), myInfoRequest);
        return ApiUtils.success("내 정보 수정 성공");
    }

    @PutMapping("/owners/{ownerId}/points")
    public ApiResult<?> updatePoint(@PathVariable Long ownerId, @RequestBody PointUpdateRequest pointUpdateRequest) {
        ownerService.updatePoint(ownerId, pointUpdateRequest);
        return ApiUtils.success("포인트 업데이트 성공");
    }

    @GetMapping("/owners/{ownerId}/fcm-token")
    public ApiResult<?> getFcmToken(@PathVariable Long ownerId) {
        OwnerFcmTokenResponse fcmToken = ownerService.getFcmToken(ownerId);
        return ApiUtils.success(fcmToken);
    }
}
