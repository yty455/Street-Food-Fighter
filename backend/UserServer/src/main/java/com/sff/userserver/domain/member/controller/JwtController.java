package com.sff.userserver.domain.member.controller;

import com.sff.userserver.domain.member.dto.JwtRequest;
import com.sff.userserver.global.jwt.service.JwtService;
import com.sff.userserver.global.utils.ApiResult;
import com.sff.userserver.global.utils.ApiUtils;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user-server")
public class JwtController {
    private final JwtService jwtService;

    @PostMapping("/jwt")
    public ApiResult<?> reissueJwt(@Valid @RequestBody JwtRequest jwtRequest, HttpServletResponse response) {
        jwtService.findMemberAndUpdateJwt(jwtRequest.getRefreshToken(), response);

        return ApiUtils.success("JWT Access & Refresh 재발급 성공");
    }
}
