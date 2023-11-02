package com.sff.OrderServer.error.code;

import com.sff.OrderServer.error.type.ServiceError;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum FundingError implements ServiceError {
    EXIST_FUNDING_FOR_BUCKET(3600, "펀딩 정보가 존재하는 바구니입니다.")
    ;

    private final int code;
    private final String message;
}
