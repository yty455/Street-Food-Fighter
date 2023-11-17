package com.sff.storeserver.common.error.code;


import com.sff.storeserver.common.error.type.ServiceError;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum FlagError implements ServiceError {
    NOT_FOUND_FLAG(2500, "깃발을 찾을 수 없습니다.");

    private final int code;
    private final String message;
}