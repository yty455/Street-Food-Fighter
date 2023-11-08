package com.sff.ownerserver.domain.owner.dto;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class PointUpdateRequest {
    private Long amount;
    private boolean isCharge;
}
