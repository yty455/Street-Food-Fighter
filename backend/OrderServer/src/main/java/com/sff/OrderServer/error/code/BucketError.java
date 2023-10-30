package com.sff.OrderServer.error.code;

import com.sff.OrderServer.error.type.ServiceError;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor

public enum BucketError implements ServiceError {
    EXIST_UNPAYMENT_BUCKET(3300, "exist_unpayment_bucket");

    private final int code;
    private final String message;
}
