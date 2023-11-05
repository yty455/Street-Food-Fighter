package com.sff.PaymentServer.error.code;

import com.sff.PaymentServer.error.type.ServiceError;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum OrderError implements ServiceError {
    NETWORK_ERROR_ORDER(4100, "주문 서버와 통신 에러")
    ;

    private final int code;
    private final String message;
}