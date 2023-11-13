package com.sff.notificationserver.domain.notification.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OwnerTokenInfo {
    private Long ownerId;
    private String fcmToken;
}
