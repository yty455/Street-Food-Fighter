package com.sff.OrderServer.error.code;

import com.sff.OrderServer.error.type.ServiceError;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum OrderError implements ServiceError {
    FAILED_CREATE_ORDER(3000, "failed_create_order"),
    NON_EXIST_ORDER(3001, "non_exist_order");
    private final int code;
    private final String message;
}
