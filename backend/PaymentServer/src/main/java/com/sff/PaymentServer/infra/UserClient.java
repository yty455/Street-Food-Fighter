package com.sff.PaymentServer.infra;

import com.sff.PaymentServer.dto.PointUpdateRequest;
import com.sff.PaymentServer.utils.ApiResult;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "userserver", url = "${feign.userserver.url}")
public interface UserClient {

    @PutMapping("/api/user-server/{memberId}/points")
    ApiResult updateUserPoint(@PathVariable Long memberId, @RequestBody PointUpdateRequest pointUpdateRequest);
}
