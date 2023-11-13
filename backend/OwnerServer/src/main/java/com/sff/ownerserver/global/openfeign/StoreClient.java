package com.sff.ownerserver.global.openfeign;

import com.sff.ownerserver.domain.owner.dto.StoreSignUpRequest;
import com.sff.ownerserver.global.utils.ApiResult;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "store-server", url = "${feign.store-server.url}")
public interface StoreClient {
    @PostMapping("/stores")
    ApiResult<?> storeSignUp(@RequestBody StoreSignUpRequest storeSignUpRequest);

    @DeleteMapping("/stores")
    ApiResult<?> deleteStore();
}
