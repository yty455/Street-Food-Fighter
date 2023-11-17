package com.sff.OrderServer.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

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
