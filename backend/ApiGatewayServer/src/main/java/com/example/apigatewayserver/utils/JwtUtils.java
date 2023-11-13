package com.example.apigatewayserver.utils;

import com.example.apigatewayserver.utils.exception.BaseException;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.NoArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;

@Component
@NoArgsConstructor
public class JwtUtils implements InitializingBean {
    private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);
    private Key key;
    @Value("${app.jwtSecret}")
    private String jwtSecret;
    @Value("${app.jwtExpirationMs}")
    private int jwtExpirationMs;

    @Override
    public void afterPropertiesSet() {
        byte[] keyBytes = Decoders.BASE64.decode(jwtSecret);
        this.key = Keys.hmacShaKeyFor(keyBytes);
    }

    // 토큰에서 모든 클레임을 추출합니다.
    private Claims getAllClaimsFromToken(String token) {
        return Jwts.parser().setSigningKey(jwtSecret.getBytes()).parseClaimsJws(token).getBody();
    }

    // 토큰에서 특정 클레임을 추출합니다.
    public Integer getSpecificClaimFromToken(String token, String claimKey) {
        Claims claims = getAllClaimsFromToken(token);
        return claims.get(claimKey, Integer.class);
    }

    public void validateJwtToken(String authToken) {
        try {
            Jwts.parser().setSigningKey(jwtSecret.getBytes()).parseClaimsJws(authToken);
            return;
        } catch (MalformedJwtException e) {
            logger.error("Invalid JWT token: {}", e.getMessage());
            throw new BaseException(new ApiError("올바르지 않은 토큰 구조입니다.", 300));
        } catch (ExpiredJwtException e) {
            logger.error("JWT token is expired: {}", e.getMessage());
            throw new BaseException(new ApiError("만료된 토큰입니다.", 300));
        } catch (UnsupportedJwtException e) {
            logger.error("JWT token is unsupported: {}", e.getMessage());
            throw new BaseException(new ApiError("유효하지 않은 토큰입니다.", 300));
        } catch (IllegalArgumentException e) {
            logger.error("JWT claims string is empty: {}", e.getMessage());
            throw new BaseException(new ApiError("빈 토큰입니다.", 300));
        } catch (Exception e) {
            logger.error(e.getMessage());
        }
        logger.error("JWT error");
        throw new BaseException(new ApiError("유효하지 않은 토큰입니다.", 300));
    }
}