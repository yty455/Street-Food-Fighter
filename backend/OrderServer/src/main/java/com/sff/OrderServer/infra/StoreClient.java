package com.sff.OrderServer.infra;

import com.sff.OrderServer.dto.StoreMSARequest;
import com.sff.OrderServer.utils.ApiResult;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "storeClient", url = "${spring.data.Store_Server}")
public interface StoreClient {

    @PostMapping("/api/store-service/msa/store")
    ApiResult getStores(@RequestBody StoreMSARequest storeMSARequest);
}
