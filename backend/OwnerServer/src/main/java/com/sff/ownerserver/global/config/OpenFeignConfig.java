package com.sff.ownerserver.global.config;

import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableFeignClients("com.sff.ownerserver")
public class OpenFeignConfig {
}
