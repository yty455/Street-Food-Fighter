package com.sff.notificationserver.domain.notification.controller;

import com.sff.notificationserver.common.Svc1FeignConfig;
import com.sff.notificationserver.common.utils.ApiResult;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@FeignClient(name = "${feign.svc1.name}", url = "${feign.svc1.url}", configuration = Svc1FeignConfig.class)
public interface Svc1FeignClient {

    @GetMapping(value = "/api/user-server/user/{userId}/points")
    ApiResult<Integer> getUserPoint(@PathVariable("userId") Long userId);
//
//    @GetMapping(value = "/api/user-server/user/{userId}/points")
//    ApiResult<Integer> getUserPoint(@PathVariable("userId") Long userId);
//
//    @GetMapping(value = "/api/user-server/user/{userId}/points")
//    ApiResult<Integer> getUserPoint(@PathVariable("userId") Long userId);

}
