package com.sff.userserver.domain.member.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class MembersInfoRequest {
    private List<Long> memberIds;

    public MembersInfoRequest(List<Long> memberIds) {
        this.memberIds = memberIds;
    }
}
