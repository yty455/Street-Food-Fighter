package com.sff.ownerserver.domain.owner.controller;

import com.sff.ownerserver.domain.owner.dto.MyInfoRequest;
import com.sff.ownerserver.domain.owner.dto.OwnerInfoResponse;
import com.sff.ownerserver.domain.owner.dto.PointUpdateRequest;
import com.sff.ownerserver.domain.owner.dto.SignupRequest;
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

    @DeleteMapping("/{ownerId}")
    public ApiResult<?> deleteOwner(@PathVariable Long ownerId) {
        ownerService.deleteOwner(ownerId);
        return ApiUtils.success("회원 탈퇴 완료");
    }

    @GetMapping("/me")
    public ApiResult<?> getOwner() {
        OwnerInfoResponse owner = ownerService.getOwner(1L); // TODO: 실제 인증된 회원의 ID 넣기
        return ApiUtils.success(owner);
    }

    @PatchMapping("/me")
    public ApiResult<?> updateOwner(@RequestBody MyInfoRequest myInfoRequest) {
        ownerService.updateMember(1L, myInfoRequest); // TODO: 실제 인증된 회원의 ID 넣기
        return ApiUtils.success("내 정보 수정 성공");
    }

    @PutMapping("/{ownerId}/points")
    public ApiResult<?> updatePoint(@PathVariable Long ownerId, @RequestBody PointUpdateRequest pointUpdateRequest) {
        ownerService.updatePoint(ownerId, pointUpdateRequest);
        return ApiUtils.success("포인트 업데이트 성공");
    }

}
