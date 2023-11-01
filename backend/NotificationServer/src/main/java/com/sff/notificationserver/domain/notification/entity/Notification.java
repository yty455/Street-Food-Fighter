package com.sff.notificationserver.domain.notification.entity;

import com.sff.notificationserver.common.BaseEntity;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder(toBuilder = true)
public class Notification{

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

    /*

    알림 종류 6가지
    펀딩성공 - SUCCESS
    펀딩실패 - FAILURE
    주문접수 - PROCESSING
    음식준비 - COMPLETED
    주문거절 - REFUSED
    리뷰요청 - REQUEST

     */

}
