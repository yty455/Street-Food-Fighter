package com.sff.OrderServer.error.code;

import com.sff.OrderServer.error.type.ServiceError;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum OrderError implements ServiceError {
    FAILED_CREATE_ORDER(3000, "failed_create_order"),
    NON_EXIST_ORDER(3001, "non_exist_order"),
    FAILED_UPDATE_STATE_WAITING(3002,"failed_update_state_waiting"),
    FAILED_UPDATE_STATE_PROCESSING(3003,"failed_update_state_processing"),
    FAILED_UPDATE_STATE_COMPLETED(3004,"failed_update_state_completed"),
    FAILED_UPDATE_STATE_REQUEST(3005,"failed_update_state_request"),
    FAILED_UPDATE_STATE_REFUSED(3006,"failed_update_state_refused"),
    EXIST_ORDER_RECORD(3007, "존재하는 주문 기록입니다."),
    NON_EXIST_STORE(3008, "존재하지 않는 가게입니다."),
    FAILED_KAFKA(3009, "카프카 실패");
    private final int code;
    private final String message;
}
