package com.sff.ownerserver.domain.owner.controller;

import com.sff.ownerserver.domain.owner.dto.SignupRequest;
import com.sff.ownerserver.domain.owner.service.OwnerService;
import com.sff.ownerserver.global.utils.ApiResult;
import com.sff.ownerserver.global.utils.ApiUtils;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
