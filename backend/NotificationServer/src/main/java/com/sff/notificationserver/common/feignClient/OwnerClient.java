package com.sff.notificationserver.common.feignClient;

import com.sff.notificationserver.common.utils.ApiResult;
import com.sff.notificationserver.domain.notification.dto.OwnerTokenInfo;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "ownerserver", url = "${feign.ownerserver.url}")
public interface OwnerClient {

    // 사장ID List -> 사장 FCM Token
    @GetMapping(value = "/api/owner-server/owners/{ownerId}/fcm-token")
    ApiResult<OwnerTokenInfo> getStoreFCM(@PathVariable("ownerId") Long ownerId);

}
