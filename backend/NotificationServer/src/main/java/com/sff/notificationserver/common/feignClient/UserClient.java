package com.sff.notificationserver.common.feignClient;

import com.sff.notificationserver.common.utils.ApiResult;
import com.sff.notificationserver.domain.notification.dto.OwnerTokenInfo;
import com.sff.notificationserver.domain.notification.dto.UserTokenInfo;
import com.sff.notificationserver.domain.notification.dto.UserTokenRequest;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@FeignClient(name = "userserver", url = "${feign.userserver.url}")
public interface UserClient {

    @GetMapping(value = "/api/user-server/user/{userId}/points")
    ApiResult<Integer> getUserPoint(@PathVariable("userId") Long userId);

    // 유지ID List -> 유저 FCM Token List
    @PostMapping(value = "/api/user-server/members/tokens")
    ApiResult<List<UserTokenInfo>> getUserFCM(@RequestBody UserTokenRequest userTokenRequest);

    // 사장ID List -> 사장 FCM Token
    @GetMapping(value = "/api/owner-server/owners/{ownerId}/fcm-token")
    ApiResult<OwnerTokenInfo> getStoreFCM(@PathVariable("ownerId") Long ownerId);

}
