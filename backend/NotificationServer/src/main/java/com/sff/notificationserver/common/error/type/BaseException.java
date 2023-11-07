package com.sff.notificationserver.common.error.type;

import com.sff.notificationserver.common.utils.ApiError;
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