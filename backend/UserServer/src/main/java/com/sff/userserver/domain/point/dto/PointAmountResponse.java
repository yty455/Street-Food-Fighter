package com.sff.userserver.domain.point.dto;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PointAmountResponse {
    private Integer amount;

    public PointAmountResponse(Integer amount) {
        this.amount = amount;
    }
}
