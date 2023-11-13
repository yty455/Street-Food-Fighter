package com.sff.storeserver.common.error.code;


import com.sff.storeserver.common.error.type.ServiceError;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum StoreError implements ServiceError {
    NOT_FOUND_STORE(2000, "가게를 찾을 수 없습니다.");

    private final int code;
    private final String message;
}