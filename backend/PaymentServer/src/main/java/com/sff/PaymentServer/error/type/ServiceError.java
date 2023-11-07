package com.sff.PaymentServer.error.type;

public interface ServiceError {
    int getCode();
    String getMessage();
}
