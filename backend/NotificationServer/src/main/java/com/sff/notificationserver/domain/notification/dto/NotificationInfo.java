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
    private String storeName;

    public NotificationInfo(Long targetId, NotificationType type, int totalPrice, LocalDateTime createdDate, String storeName) {
        this.targetId = targetId;
        this.type = type;
        this.totalPrice = totalPrice;
        this.createdDate = createdDate;
        this.storeName = storeName;
    }
}
