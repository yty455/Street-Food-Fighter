package com.sff.ownerserver.global.error;

import com.sff.ownerserver.global.error.type.BaseException;
import com.sff.ownerserver.global.error.type.ValidationException;
import com.sff.ownerserver.global.utils.ApiResult;
import com.sff.ownerserver.global.utils.ApiUtils;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(BaseException.class)
    @ResponseBody
    public ApiResult<?> handleAllExceptions(BaseException be) {
        return ApiUtils.error(be.getApiError());
    }

    @ExceptionHandler(ValidationException.class)
    @ResponseBody
    public ApiResult<?> handleAllExceptions(ValidationException ex) {
        for (FieldError fieldError : ex.getFieldErrors()) {
            String fieldName = fieldError.getField();
            String errorMessage = fieldError.getDefaultMessage();
            Object rejectedValue = fieldError.getRejectedValue();
            return ApiUtils.error(errorMessage, 1000);
        }
        return ApiUtils.error("Valid 에러", 1000);
    }

    // Custom Exception에 따른 추가적인 handler 필요
}

