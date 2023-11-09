package com.sff.userserver.global.login.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sff.userserver.global.utils.ApiError;
import com.sff.userserver.global.utils.ApiResult;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;

import java.io.IOException;

/**
 * JWT 로그인 실패 시 처리하는 핸들러
 * SimpleUrlAuthenticationFailureHandler 를 상속받아서 구현
 */
@Slf4j
public class LoginFailureHandler extends SimpleUrlAuthenticationFailureHandler {

    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response,
                                        AuthenticationException exception) throws IOException {
        response.setStatus(HttpServletResponse.SC_BAD_REQUEST);

        log.info("로그인에 실패했습니다.");

        ApiResult<String> apiResult = new ApiResult<>(false, null, new ApiError("이메일 혹은 비밀번호가 올바르지 않습니다.", 1100));
        response.setContentType("application/json");
        new ObjectMapper().writeValue(response.getOutputStream(), apiResult);
    }
}