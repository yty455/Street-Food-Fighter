package com.sff.storeserver.common.error.code;


import com.sff.storeserver.common.error.type.ServiceError;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum MenuError implements ServiceError {
    NOT_FOUND_STORE(2000, "exist_unpayment_bucket");

    private final int code;
    private final String message;
}