package com.sff.PaymentServer.error.code;

import com.sff.PaymentServer.error.type.ServiceError;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum OrderError implements ServiceError {
    ;

    private final int code;
    private final String message;
}