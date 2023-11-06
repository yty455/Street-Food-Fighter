package com.sff.notificationserver.domain.notification.dto;

import com.sff.notificationserver.domain.notification.entity.NotificationType;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@Builder
@NoArgsConstructor
public class NotificationInfo {
    private Long targetId;
    private NotificationType type;
    private int totalPrice;
    private LocalDateTime createdDate;

    public NotificationInfo(Long targetId, NotificationType type, int totalPrice, LocalDateTime createdDate) {
        this.targetId = targetId;
        this.type = type;
        this.totalPrice = totalPrice;
        this.createdDate = createdDate;
    }
}
