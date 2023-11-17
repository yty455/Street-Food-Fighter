package com.sff.userserver.domain.member.dto;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class GradeUpdateRequestList {
    private List<GradeUpdateRequest> gradeUpdateRequests;
}
