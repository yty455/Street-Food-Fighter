package com.sff.PaymentServer.infra;

import com.sff.PaymentServer.dto.PointUpdateRequest;
import com.sff.PaymentServer.utils.ApiResult;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "ownerserver", url = "${feign.ownerserver.url}")
public interface OwnerClient {

    @PutMapping("/api/owner-server/owners/{ownerId}/points")
    ApiResult updateOwnerPoint(@PathVariable Long ownerId, @RequestBody PointUpdateRequest pointUpdateRequest);
}
