package com.sff.storeserver.common.error.code;


import com.sff.storeserver.common.error.type.ServiceError;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum MenuError implements ServiceError {
    NOT_FOUND_MENU(2200, "메뉴를 찾을수 없습니다."),
    NOT_STORE_OWNER(2201, "가게 주인이 아닙니다.");

    private final int code;
    private final String message;
}