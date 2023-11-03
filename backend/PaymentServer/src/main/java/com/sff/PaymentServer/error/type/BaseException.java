package com.sff.PaymentServer.error.type;

import com.sff.OrderServer.utils.ApiError;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class BaseException extends RuntimeException {
    private ApiError apiError;

    public BaseException(String message){
        super(message);
    }

    public BaseException(ApiError apiError){
        this.apiError = apiError;
    }
}