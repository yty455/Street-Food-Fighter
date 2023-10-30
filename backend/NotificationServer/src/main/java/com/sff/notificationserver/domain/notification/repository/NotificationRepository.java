package com.sff.notificationserver.domain.notification.repository;

import com.sff.notificationserver.domain.notification.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {

    List<Notification> findByRecipient(Long userId);
}
