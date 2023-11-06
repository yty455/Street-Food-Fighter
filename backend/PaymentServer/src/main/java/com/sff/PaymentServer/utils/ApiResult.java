package com.sff.PaymentServer.utils;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ApiResult<T> {
    private final Boolean success;
    private final T response;
    private final ApiError apiError;
}