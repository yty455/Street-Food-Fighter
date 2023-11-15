package com.sff.PaymentServer.error.code;

import com.sff.PaymentServer.error.type.ServiceError;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum PaymentError implements ServiceError {
    ERROR_SAVE_PAYEMNTRECORD(4100, "결제 정보 저장 에러"),
    ERROR_PAYMENT_STATE_CHANGE(4101, "결제 상태 변경 에러"),
    NOT_EXIST_PAYMENTRECORD(4102, "존재하지 않는 결제 정보"),
    ERROR_NOTIFICATION_REQUEST(4103, "알림 요청 에러"),
    SERIAL_ERROR(4104, "객체 직렬화 실패")
    ;

    private final int code;
    private final String message;
}
