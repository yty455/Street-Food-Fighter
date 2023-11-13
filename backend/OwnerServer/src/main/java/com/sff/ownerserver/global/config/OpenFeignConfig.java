package com.sff.ownerserver.global.config;

import feign.RequestInterceptor;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@Configuration
@EnableFeignClients("com.sff.ownerserver")
public class OpenFeignConfig {
    @Bean
    public RequestInterceptor requestInterceptor() {
        return template -> {
            ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder
                    .getRequestAttributes();

            if (attributes == null) {
                return;
            }

            String userId = attributes.getRequest().getHeader("UserId");
            // jwt 토큰도 동일하게 추가 필요
            if (userId != null) {
                template.header("UserId", userId);
            }
        };
    }
}
