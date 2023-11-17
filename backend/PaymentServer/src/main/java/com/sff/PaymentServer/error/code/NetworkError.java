package com.sff.PaymentServer.error.code;

import com.sff.PaymentServer.error.type.ServiceError;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum NetworkError implements ServiceError {
    NETWORK_ERROR_ORDER(4000, "주문 서버와 통신 에러"),
    NETWORK_ERROR_USER(4001, "회원 서버와 통신 에러"),
    NETWORK_ERROR_STORE(4002, "가게 서버와 통신 에러"),
    NETWORK_ERROR_OWNER(4003, "사장 서버와 통신 에러")
    ;

    private final int code;
    private final String message;
}
