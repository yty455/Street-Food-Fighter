package com.sff.notificationserver.common.feignClient;

import com.sff.notificationserver.common.utils.ApiResult;
import com.sff.notificationserver.domain.notification.dto.UserPointInfo;
import com.sff.notificationserver.domain.notification.dto.UserTokenInfo;
import com.sff.notificationserver.domain.notification.dto.UserTokenRequest;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@FeignClient(name = "userserver", url = "${feign.userserver.url}")
public interface UserClient {

    @GetMapping(value = "/api/user-server/me/points")
    ApiResult<UserPointInfo> getUserPoint();

    // 유지ID List -> 유저 FCM Token List
    @PostMapping(value = "/api/user-server/members/tokens")
    ApiResult<List<UserTokenInfo>> getUserFCM(@RequestBody UserTokenRequest userTokenRequest);

}
