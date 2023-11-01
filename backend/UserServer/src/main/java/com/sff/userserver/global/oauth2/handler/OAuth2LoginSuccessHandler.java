package com.sff.userserver.global.oauth2.handler;

import com.sff.userserver.domain.member.entity.Member;
import com.sff.userserver.domain.member.entity.Role;
import com.sff.userserver.domain.member.repository.MemberRepository;
import com.sff.userserver.global.error.type.BaseException;
import com.sff.userserver.global.jwt.service.JwtService;
import com.sff.userserver.global.oauth2.CustomOAuth2User;
import com.sff.userserver.global.utils.ApiError;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Slf4j
@Component
@RequiredArgsConstructor
public class OAuth2LoginSuccessHandler implements AuthenticationSuccessHandler {

    @Value("${jwt.access.header}")
    private String accessHeader;

    @Value("${jwt.refresh.header}")
    private String refreshHeader;

    private final JwtService jwtService;
    private final MemberRepository memberRepository;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException {
        log.info("OAuth2 Login 성공!");
        CustomOAuth2User oAuth2User = (CustomOAuth2User) authentication.getPrincipal();

        // User의 Role이 GUEST일 경우 처음 요청한 회원이므로 회원가입 페이지로 리다이렉트
        if (oAuth2User.getRole() == Role.GUEST) {
            response.sendRedirect("oauth2/sign-up"); // 프론트의 회원가입 추가 정보 입력 폼으로 리다이렉트

            Member member = memberRepository.findById(oAuth2User.getId())
                    .orElseThrow(() -> new BaseException(new ApiError("일치하는 회원이 없습니다.", 1101)));
            jwtService.sendAccessAndRefreshToken(member, response);
        } else {
            loginSuccess(response, oAuth2User); // 로그인에 성공한 경우 access, refresh 토큰 생성
        }
    }

    // TODO : 소셜 로그인 시에도 무조건 토큰 생성하지 말고 JWT 인증 필터처럼 RefreshToken 유/무에 따라 다르게 처리해보기
    private void loginSuccess(HttpServletResponse response, CustomOAuth2User oAuth2User) throws IOException {
        Member member = memberRepository.findById(oAuth2User.getId())
                .orElseThrow(() -> new BaseException(new ApiError("일치하는 회원이 없습니다.", 1101)));
        String refreshToken = jwtService.sendAccessAndRefreshToken(member, response);
        jwtService.updateRefreshToken(member, refreshToken);
    }
}