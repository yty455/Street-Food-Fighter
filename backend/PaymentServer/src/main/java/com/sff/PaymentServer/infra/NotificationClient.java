package com.sff.PaymentServer.infra;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;

@FeignClient(name = "notificationClient", url = "${spring.data.Notification_Server}")
public interface NotificationClient {



}
