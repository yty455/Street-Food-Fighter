package com.sff.storeserver.common;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum Status {
    ACTIVE("활성화"), INACTIVE("비활성화");
    private final String text;
}
