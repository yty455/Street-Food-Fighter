package com.sff.notificationserver.domain.notification.dto;

import com.sff.notificationserver.domain.notification.entity.NotificationType;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserNotificationInfo {

    private Long storeId;
    private String storeName;

    private List<UserInfo> userList;
    private NotificationType type;

}
