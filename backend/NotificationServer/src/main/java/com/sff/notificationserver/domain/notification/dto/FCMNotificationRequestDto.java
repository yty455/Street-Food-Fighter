package com.sff.notificationserver.domain.notification.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@AllArgsConstructor
@Builder
public class FCMNotificationRequestDto {
    private Long recipient;
    private String title;
    private String body;
}
