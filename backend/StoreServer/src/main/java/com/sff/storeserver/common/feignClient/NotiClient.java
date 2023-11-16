package com.sff.storeserver.common.feignClient;

import com.sff.storeserver.common.utils.ApiResult;
import com.sff.storeserver.domain.review.dto.NotificationUpdateRequest;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "notiserver", url = "${feign.notiserver.url}")
public interface NotiClient {
    @PutMapping(value = "/api/noti-server/notification")
    ApiResult<String> updateType(@RequestBody NotificationUpdateRequest notificationUpdateRequest);

}

