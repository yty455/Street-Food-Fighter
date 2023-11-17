package com.sff.ownerserver.global.jwt.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.sff.ownerserver.domain.owner.entity.Owner;
import com.sff.ownerserver.domain.owner.repository.OwnerRepository;
import com.sff.ownerserver.global.error.type.BaseException;
import com.sff.ownerserver.global.utils.ApiError;
import jakarta.servlet.http.HttpServletResponse;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

@Service
@RequiredArgsConstructor
@Getter
@Slf4j
public class JwtService {
    @Value("${jwt.secretKey}")
    private String secretKey;

    @Value("${jwt.access.expiration}")
    private Long accessTokenExpirationPeriod;

    @Value("${jwt.refresh.expiration}")
    private Long refreshTokenExpirationPeriod;

    @Value("${jwt.access.header}")
    private String accessHeader;

    @Value("${jwt.refresh.header}")
    private String refreshHeader;

    /**
     * JWT의 Subject와 Claim으로 email 사용 -> 클레임의 name을 "email"으로 설정
     * JWT의 헤더에 들어오는 값 : 'Authorization(Key) = Bearer {토큰} (Value)' 형식
     */
    private static final String ACCESS_TOKEN_SUBJECT = "AccessToken";
    private static final String REFRESH_TOKEN_SUBJECT = "RefreshToken";
    private static final String ID_CLAIM = "userId";
    private static final String BEARER = "Bearer ";

    private final OwnerRepository ownerRepository;

    /**
     * AccessToken 생성
     * 클레임은 기본적으로 userId 만 사용
     * 추가하고 싶다면 .withClaim() 을 사용해서 추가 가능
     */
    public String createAccessToken(Long id) {
        Date now = new Date();
        return JWT.create() // JWT 토큰을 생성하는 빌더 반환
                .withSubject(ACCESS_TOKEN_SUBJECT) // JWT 의 Subject 지정 -> AccessToken이므로 AccessToken
                .withExpiresAt(new Date(now.getTime() + accessTokenExpirationPeriod)) // 토큰 만료 시간 설정
                .withClaim(ID_CLAIM, id)
                .sign(Algorithm.HMAC512(secretKey)); // HMAC512 알고리즘 사용, application-jwt.yml에서 지정한 secret 키로 암호화
    }

    /**
     * RefreshToken 생성
     * RefreshToken은 Claim에 userId도 넣지 않으므로 withClaim() X
     */
    public String createRefreshToken() {
        Date now = new Date();
        return JWT.create()
                .withSubject(REFRESH_TOKEN_SUBJECT)
                .withExpiresAt(new Date(now.getTime() + refreshTokenExpirationPeriod))
                .sign(Algorithm.HMAC512(secretKey));
    }

    /**
     * AccessToken 헤더에 실어서 보내기
     */
    public void sendAccessToken(HttpServletResponse response, String accessToken) {
        response.setStatus(HttpServletResponse.SC_OK);

        response.setHeader(accessHeader, accessToken);
        log.info("재발급된 Access Token : {}", accessToken);
    }

    @Transactional
    public void findMemberAndUpdateJwt(String refreshToken, HttpServletResponse response) {
        Owner findOwner = ownerRepository.findByRefreshToken(refreshToken)
                .orElseThrow(() -> new BaseException(new ApiError("일치하는 사장 계정이 없습니다.", 1201)));
        String reissueRefreshToken = sendAccessAndRefreshToken(findOwner, response);

        updateRefreshToken(findOwner, reissueRefreshToken);
    }

    /**
     * AccessToken + RefreshToken 헤더에 실어서 보내기
     */
    public String sendAccessAndRefreshToken(Owner owner, HttpServletResponse response) {
        String reissueAccessToken = createAccessToken(owner.getId());
        String reissueRefreshToken = createRefreshToken();
        setAccessTokenHeader(response, reissueAccessToken);
        setRefreshTokenHeader(response, reissueRefreshToken);
        log.info("Access Token, Refresh Token 헤더 설정 완료");
        log.info("Access Token : {}", reissueAccessToken);
        log.info("Access Token 만료 기간 : {}", accessTokenExpirationPeriod);
        return reissueRefreshToken;
    }

    /**
     * AccessToken 헤더 설정
     */
    public void setAccessTokenHeader(HttpServletResponse response, String accessToken) {
        response.setHeader(accessHeader, accessToken);
    }

    /**
     * RefreshToken 헤더 설정
     */
    public void setRefreshTokenHeader(HttpServletResponse response, String refreshToken) {
        response.setHeader(refreshHeader, refreshToken);
    }

    public void updateRefreshToken(Owner owner, String refreshToken) {
        owner.updateRefreshToken(refreshToken);
    }

}
