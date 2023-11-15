package com.sff.storeserver.common.feignClient;

import com.sff.storeserver.common.utils.ApiResult;
import com.sff.storeserver.domain.review.dto.NotificationUpdateRequest;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "notiserver", url = "${feign.notiserver.url}")
public interface NotiClient {
    @GetMapping(value = "/api/order-server/{orderId}")
    ApiResult<String> updateType(@RequestBody NotificationUpdateRequest notificationUpdateRequest);

}
