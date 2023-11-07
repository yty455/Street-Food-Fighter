package com.sff.PaymentServer.infra;

import com.sff.PaymentServer.dto.OrderCreateRequest;
import com.sff.PaymentServer.dto.OrderCreateResponse;
import com.sff.PaymentServer.utils.ApiResult;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.Mapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "storeClient", url = "${spring.data.Store_Server}")
public interface StoreClient {

    @GetMapping(value = "/api/store-service/store/{storeId}/owner")
    ApiResult<Long> getOwnerId(@PathVariable Long storeId);

}
