package com.sff.storeserver.common.error.type;

public interface ServiceError {
    int getCode();
    String getMessage();
}