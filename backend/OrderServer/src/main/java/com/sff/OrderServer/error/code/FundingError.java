package com.sff.OrderServer.error.code;

import com.sff.OrderServer.error.type.ServiceError;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum FundingError implements ServiceError {
    FAIL_TO_CREATE_FUNDING(3600, "펀딩 정보 저장에 실패했습니다."),
    EXIST_FUNDING_FOR_BUCKET(3601, "펀딩 정보가 존재하는 바구니입니다."),
    NOT_EXIST_FUNDING(3602, "존재하지 않는 펀딩입니다."),
    CREATE_FUNDINGITEM_LIST(3603, "펀딩 메뉴 리스트 변환 도중 에러가 발생했습니다."),
    UPDATE_FUNDINGSTATE_ERROR(3604, "펀딩 상태 변경에 실패하였습니다."),
    UPDATE_FUNDING_ORDERSTATE_ERROR(3605, "펀딩 주문 상태 변경에 실패하였습니다.")
    ;

    private final int code;
    private final String message;
}
