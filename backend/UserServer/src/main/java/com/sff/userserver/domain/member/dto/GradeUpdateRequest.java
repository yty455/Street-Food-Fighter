package com.sff.userserver.domain.member.dto;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class GradeUpdateRequest {
    private Long memberId;
    private Integer orderCount;

    public GradeUpdateRequest(Long memberId, Integer orderCount) {
        this.memberId = memberId;
        this.orderCount = orderCount;
    }
}
