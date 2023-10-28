package com.sff.userserver.global.login.handler;

import com.sff.userserver.domain.Member.entity.Member;
import com.sff.userserver.domain.Member.repository.MemberRepository;
import com.sff.userserver.global.error.type.BaseException;
import com.sff.userserver.global.jwt.service.JwtService;
import com.sff.userserver.global.utils.ApiError;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;

@Slf4j
@RequiredArgsConstructor
public class LoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    private final JwtService jwtService;
    private final MemberRepository memberRepository;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) {
        Long id = Long.valueOf(extractUsername(authentication)); // 인증 정보에서 Username(id) 추출
        Member findMember = memberRepository.findById(id)
                .orElseThrow(() -> new BaseException(new ApiError("일치하는 회원이 없습니다.", 200)));

        String reissueRefreshToken = jwtService.sendAccessAndRefreshToken(findMember, response);// 응답 헤더에 AccessToken, RefreshToken 실어서 응답
        findMember.updateRefreshToken(reissueRefreshToken);
        memberRepository.saveAndFlush(findMember);

        log.info("로그인에 성공했습니다. 이메일 : {}", findMember.getEmail());
    }

    private String extractUsername(Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        return userDetails.getUsername();
    }
}
