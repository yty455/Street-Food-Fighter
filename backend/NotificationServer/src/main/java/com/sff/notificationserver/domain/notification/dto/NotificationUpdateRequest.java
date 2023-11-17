package com.sff.notificationserver.domain.notification.dto;

import com.sff.notificationserver.domain.notification.entity.NotificationType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NotificationUpdateRequest {
    private Long targetId;
    private NotificationType type;
}
