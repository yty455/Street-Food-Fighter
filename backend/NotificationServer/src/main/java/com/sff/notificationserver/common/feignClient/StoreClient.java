package com.sff.notificationserver.common.feignClient;

import com.sff.notificationserver.common.utils.ApiResult;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "storeserver", url = "${feign.storeserver.url}")
public interface StoreClient {
    @GetMapping(value = "/api/store-service/store/{storeId}/owner")
    ApiResult<Long> getOwnerId(@PathVariable("storeId") Long storeId);

    @GetMapping(value = "/api/store-service/store/{storeId}/name")
    ApiResult<String> getStoreName(@PathVariable("storeId") Long storeId);
}
