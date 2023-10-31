package com.sff.OrderServer.error.code;

import com.sff.OrderServer.error.type.ServiceError;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum OrderError implements ServiceError {
    FAILED_CREATE_ORDER(3000, "failed_create_order");

    private final int code;
    private final String message;
}
