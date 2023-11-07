package com.sff.notificationserver.domain.notification.dto;

import com.sff.notificationserver.domain.notification.entity.NotificationType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserNotificationInfo {

    private Long storeId;
    private String storeName;

    private List<UserInfo> userList;
    private NotificationType type;

}
