package com.sff.PaymentServer.config;

import feign.RequestInterceptor;
import feign.RequestTemplate;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@Configuration
public class PaymentFeignClientConfig {
    @Bean
    public RequestInterceptor requestInterceptor() {
        return new RequestInterceptor() {
            @Override
            public void apply(RequestTemplate template) {
                ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder
                        .getRequestAttributes();

                if (attributes == null) {
                    return;
                }

                String userId = attributes.getRequest().getHeader("UserId");
                // jwt 토큰도 동일하게 추가 필요
                if (userId != null) {
                    template.header("userId", userId);
                }
            }
        };
    }
}
