package com.sff.OrderServer.infra;

import com.sff.OrderServer.dto.MemberInfoResponse;
import com.sff.OrderServer.dto.MembersInfoRequest;
import com.sff.OrderServer.utils.ApiResult;
import java.util.List;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "userserver", url = "${feign.userserver.url}")
public interface UserClient {

    @GetMapping("/api/user-server/me")
    ApiResult<MemberInfoResponse> getMember();

    @GetMapping("/api/user-server/members")
    ApiResult<List<MemberInfoResponse>> getMembers(@RequestBody MembersInfoRequest membersInfoRequest);
}
