package com.sff.ownerserver.domain.owner.controller;

import com.sff.ownerserver.global.jwt.service.JwtService;
import com.sff.ownerserver.global.utils.ApiResult;
import com.sff.ownerserver.global.utils.ApiUtils;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/owner-server")
public class JwtController {
    private final JwtService jwtService;

    @GetMapping("/jwt")
    public ApiResult<?> reissueJwt(@RequestParam("refresh-token") String refreshToken, HttpServletResponse response) {
        jwtService.findMemberAndUpdateJwt(refreshToken, response);

        return ApiUtils.success("JWT Access & Refresh 재발급 성공");
    }

}
