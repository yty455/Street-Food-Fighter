package com.sff.notificationserver.domain.notification.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder(toBuilder = true)
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "NOTIFICATION_ID")
    private Long id;

    private Long userId;
    private NotificationType type;
    private int totalPrice;
    private Long targetId;

    @CreatedDate
    @Column(name = "CREATED_AT", updatable = false)
    private LocalDateTime createdDate;

}
