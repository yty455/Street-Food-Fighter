package com.sff.notificationserver.common.feignClient;

import com.sff.notificationserver.common.utils.ApiResult;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@FeignClient(name = "userserver", url = "${feign.userserver.url}")
public interface UserClient {

    @GetMapping(value = "/api/user-server/user/{userId}/points")
    ApiResult<Integer> getUserPoint(@PathVariable("userId") Long userId);

    // 유지ID List -> 유저 FCM Token List
    @GetMapping(value = "/api/user-server/user/fcm")
    ApiResult<List<String>> getUserFCM(@PathVariable("userId") Long userId);

    // 사장ID List -> 사장 FCM Token
    @GetMapping(value = "/api/user-server/store/fcm")
    ApiResult<String> getStoreFCM(@PathVariable("userId") Long userId);

}
