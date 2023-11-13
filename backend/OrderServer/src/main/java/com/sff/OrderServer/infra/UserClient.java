package com.sff.OrderServer.infra;

import com.sff.OrderServer.dto.MemberInfoResponse;
import com.sff.OrderServer.utils.ApiResult;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

@FeignClient(name = "userserver", url = "${feign.userserver.url}")
public interface UserClient {

    @GetMapping("/api/user-server/me")
    ApiResult<MemberInfoResponse> getMember();
}
