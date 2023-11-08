package com.sff.ownerserver.domain.owner.dto;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class OwnerFcmTokenResponse {
    private Long ownerId;
    private String fcmToken;

    public OwnerFcmTokenResponse(Long ownerId, String fcmToken) {
        this.ownerId = ownerId;
        this.fcmToken = fcmToken;
    }
}
