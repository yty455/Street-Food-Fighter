package com.sff.OrderServer.error.type;

import lombok.Getter;


public interface ServiceError {
    int getCode();
    String getMessage();
}
