package com.sff.storeserver.common.utils;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ApiResult<T> {
    private Boolean success;
    private T response;
    private ApiError apiError;
}