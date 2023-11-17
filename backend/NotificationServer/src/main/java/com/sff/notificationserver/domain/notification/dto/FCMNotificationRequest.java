package com.sff.notificationserver.domain.notification.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@AllArgsConstructor
@Builder
public class FCMNotificationRequest {
    private Long recipient;
    private String token;
    private String title;
    private String body;
}
