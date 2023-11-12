package com.sff.storeserver.common.feignClient;

import com.sff.storeserver.common.utils.ApiResult;
import com.sff.storeserver.domain.flag.dto.FlagNotificationInfo;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "payserver", url = "${feign.payserver.url}")
public interface PayClient {
    @PutMapping(value = "/api/payment-server/flags/chosen")
    ApiResult<String> notifyFlag(@RequestBody FlagNotificationInfo flagNotificationInfo);
}
