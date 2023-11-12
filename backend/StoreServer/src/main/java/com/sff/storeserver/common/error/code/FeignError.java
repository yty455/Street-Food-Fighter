package com.sff.storeserver.common.error.code;

import com.sff.storeserver.common.error.type.ServiceError;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum FeignError implements ServiceError {
    FEIGN_ERROR(400, "Feign Client 에러 입니다."),
    FEIGN_ORDER_ERROR(401, "Feign Client OrderClient 에러 입니다.");

    private final int code;
    private final String message;
}