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
    FAILED_UPDATE_STATE_REFUSED(3006,"failed_update_state_refused");
    private final int code;
    private final String message;
}
