package com.sff.notificationserver.domain.notification.dto;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserInfo {
    private Long userId;
    private String token;
    private Long id;
    private int amount;
}
