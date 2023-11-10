package com.sff.OrderServer.infra;

import com.sff.OrderServer.utils.ApiResult;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "notificationClient", url = "${feign.notiserver.url}")
public interface NotificationClient {
//    ex)
//    @PutMapping("/api/user-server/{memberId}/points")
//    ApiResult updateUserPoint(@PathVariable Long memberId, @RequestBody PurposeCreateRequest purposeCreateRequest);


}
