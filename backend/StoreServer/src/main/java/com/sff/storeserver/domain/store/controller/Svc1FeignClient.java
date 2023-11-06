package com.sff.storeserver.domain.store.controller;

import com.sff.storeserver.common.Svc1FeignConfig;
import com.sff.storeserver.common.utils.ApiResult;
import com.sff.storeserver.domain.review.dto.ReviewUserInfo;
import com.sff.storeserver.domain.review.dto.ReviewUserInfoRequest;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@FeignClient(name = "${feign.svc1.name}", url = "${feign.svc1.url}", configuration = Svc1FeignConfig.class)
public interface Svc1FeignClient {

    @PostMapping(value = "/api/user-server/members")
    ApiResult<List<ReviewUserInfo>> getUserInfo(@RequestBody ReviewUserInfoRequest reviewUserInfoRequest);

}
