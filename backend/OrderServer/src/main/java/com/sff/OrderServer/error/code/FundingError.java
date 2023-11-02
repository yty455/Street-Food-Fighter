package com.sff.OrderServer.error.code;

import com.sff.OrderServer.error.type.ServiceError;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum FundingError implements ServiceError {
    FAIL_TO_CREATE_FUNDING(3600, "펀딩 정보 저장에 실패했습니다."),
    EXIST_FUNDING_FOR_BUCKET(3601, "펀딩 정보가 존재하는 바구니입니다."),
    NOT_EXIST_FUNDING(3602, "존재하지 않는 펀딩입니다.")
    ;

    private final int code;
    private final String message;
}
