package com.sff.notificationserver.domain.notification.repository;

import com.sff.notificationserver.domain.notification.dto.NotificationInfo;
import com.sff.notificationserver.domain.notification.entity.Notification;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface NotificationRepository extends JpaRepository<Notification, Long> {

    @Query("select new com.sff.notificationserver.domain.notification.dto.NotificationInfo(n.targetId, n.type, n.totalPrice, n.createdDate) from Notification n where n.userId = :userId")
    Slice<NotificationInfo> findByUserId(Long userId, Pageable pageable);
}
