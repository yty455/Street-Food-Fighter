package com.example.apigatewayserver.filter;

import com.example.apigatewayserver.utils.ApiUtils;
import com.example.apigatewayserver.utils.CustomProperties;
import com.example.apigatewayserver.utils.JwtUtils;
import com.example.apigatewayserver.utils.exception.BaseException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.cloud.gateway.route.Route;
import org.springframework.cloud.gateway.support.ServerWebExchangeUtils;
import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.core.io.buffer.DefaultDataBufferFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;

@Component
@Slf4j
public class GlobalFilter extends AbstractGatewayFilterFactory<GlobalFilter.Config> {

    private final JwtUtils jwtUtils;
    private final ObjectMapper objectMapper;
    private final CustomProperties ignoreUrl;

    //    public GlobalFilter() {
//        super(Config.class);
//        this.jwtUtils = new JwtUtils();
//        this.objectMapper = new ObjectMapper();
//    }
//
    public GlobalFilter(JwtUtils jwtUtils, ObjectMapper objectMapper, CustomProperties ignoreUrl) {
        super(Config.class);
        this.jwtUtils = jwtUtils;
        this.objectMapper = objectMapper;
        this.ignoreUrl = ignoreUrl;
    }

    @Override
    public GatewayFilter apply(Config config) {
        return ((exchange, chain) -> {
            ServerHttpRequest originalRequest = exchange.getRequest();
            ServerHttpResponse response = exchange.getResponse();
            Route route = exchange.getAttribute(ServerWebExchangeUtils.GATEWAY_ROUTE_ATTR);
            String clientIp = exchange.getRequest().getRemoteAddress().getAddress().getHostAddress();
            String path = exchange.getRequest().getURI().getPath();

            StringBuilder serverName = new StringBuilder();
            serverName.append("[");
            if (route != null && route.getId() != null) {
                serverName.append(route.getId());
            }
            serverName.append("]");
            log.info("{} IP : {}", serverName.toString(), clientIp);


            if (ignoreUrl.isIgnorePath(path)) {
                // JWT 검증 로직
                String jwt = originalRequest.getHeaders().getFirst("Authorization");
                try {
                    // jwt 추출
                    jwtUtils.validateJwtToken(jwt);
//                String userId = jwtUtils.getSpecificClaimFromToken(jwt,"userId");
//                ServerHttpRequest modifiedRequest = originalRequest.mutate()
//                        .header("Userid", userId)
//                        .build();
                } catch (BaseException e) {
                    byte[] bytes;
                    try {
                        bytes = objectMapper.writeValueAsBytes(ApiUtils.error(e.getApiError()));
                    } catch (JsonProcessingException ex) {
                        throw new RuntimeException(ex);
                    }
                    DataBuffer buffer = new DefaultDataBufferFactory().wrap(bytes);
                    response.setStatusCode(HttpStatus.OK);
                    response.getHeaders().setContentType(MediaType.APPLICATION_JSON);

                    // 오류 응답을 반환
                    return response.writeWith(Mono.just(buffer));
                }
                // JWT 로직 끝
            }

            log.info("Global Filter baseMessage: request id -> {}", config.getBaseMessage());

            if (config.isPreLogger()) {
//                log.info("Global Filter Start: request id -> {}",request.getId());
            }

            // Custom Post Filter
            return chain.filter(exchange).then(Mono.fromRunnable(() -> {
                if (config.isPostLogger()) {
                    log.info("Global Filter End: response code -> {}", response.getStatusCode());
                }
            }));
        });
    }

    @Data
    public static class Config {
        private String baseMessage;
        private boolean preLogger;
        private boolean postLogger;
    }
}
