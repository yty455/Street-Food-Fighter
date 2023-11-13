package com.sff.userserver.domain.member.controller;

import com.sff.userserver.global.jwt.service.JwtService;
import com.sff.userserver.global.utils.ApiResult;
import com.sff.userserver.global.utils.ApiUtils;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user-server")
public class JwtController {
    private final JwtService jwtService;

    @GetMapping("/jwt")
    public ApiResult<?> reissueJwt(@RequestParam("refresh-token") String refreshToken, HttpServletResponse response) {
        jwtService.findMemberAndUpdateJwt(refreshToken, response);

        return ApiUtils.success("JWT Access & Refresh 재발급 성공");
    }
}
