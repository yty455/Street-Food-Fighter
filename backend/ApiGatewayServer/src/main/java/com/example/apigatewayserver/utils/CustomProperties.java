package com.example.apigatewayserver.utils;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@ConfigurationProperties(prefix = "custom")
@Getter
@Setter
public class CustomProperties {
    private List<String> ignoreUrls;

    public boolean isCheckPath(String path) {
        return ignoreUrls.stream().noneMatch(path::startsWith);
    }
}