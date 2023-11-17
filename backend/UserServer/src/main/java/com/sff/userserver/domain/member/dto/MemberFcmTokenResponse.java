package com.sff.userserver.domain.member.dto;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MemberFcmTokenResponse {
    private Long memberId;
    private String fcmToken;

    public MemberFcmTokenResponse(Long memberId, String fcmToken) {
        this.memberId = memberId;
        this.fcmToken = fcmToken;
    }
}
