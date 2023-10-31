package com.sff.ownerserver.global.login.handler;

import com.sff.ownerserver.domain.owner.entity.Owner;
import com.sff.ownerserver.domain.owner.repository.OwnerRepository;
import com.sff.ownerserver.global.error.type.BaseException;
import com.sff.ownerserver.global.jwt.service.JwtService;
import com.sff.ownerserver.global.utils.ApiError;
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
    private final OwnerRepository ownerRepository;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) {
        Long id = Long.valueOf(extractUsername(authentication)); // 인증 정보에서 Username(id) 추출
        Owner findOwner = ownerRepository.findById(id)
                .orElseThrow(() -> new BaseException(new ApiError("일치하는 회원이 없습니다.", 200)));

        String reissueRefreshToken = jwtService.sendAccessAndRefreshToken(findOwner, response);// 응답 헤더에 AccessToken, RefreshToken 실어서 응답
        findOwner.updateRefreshToken(reissueRefreshToken);
        ownerRepository.saveAndFlush(findOwner);

        log.info("로그인에 성공했습니다. 이메일 : {}", findOwner.getEmail());
    }

    private String extractUsername(Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        return userDetails.getUsername();
    }
}
