package com.sff.OrderServer.infra;

import com.sff.OrderServer.bucket.dto.BucketRequest;
import com.sff.OrderServer.bucket.dto.BucketRequestList;
import com.sff.OrderServer.bucket.dto.Item;
import com.sff.OrderServer.dto.FlagMSAResponse;
import com.sff.OrderServer.dto.ReviewMSAResponse;
import com.sff.OrderServer.dto.StoreMSARequest;
import com.sff.OrderServer.dto.StoreMSAResponse;
import com.sff.OrderServer.utils.ApiResult;
import java.util.List;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "storeserver", url = "${feign.storeserver.url}")
public interface StoreClient {

    @PostMapping("/api/store-service/msa/store")
    ApiResult<List<StoreMSAResponse>> getStores(@RequestBody StoreMSARequest storeMSARequest);

    @GetMapping("/api/store-service/msa/review/{orderId}")
    ApiResult<ReviewMSAResponse> getReview(@PathVariable Long orderId);

    @GetMapping("/api/store-service/msa/flag/{flagId}")
    ApiResult<FlagMSAResponse> getFlagInformation(@PathVariable Long flagId);

    @GetMapping("/api/store-service/store/storeId/{ownerId}")
    ApiResult<Long> getStore(@PathVariable Long ownerId);

    // menu, option 정보 요청
    @PostMapping("/api/store-service/menus/options")
    ApiResult<List<Item>> getMenuAndOptionInformation(@RequestBody BucketRequestList bucketRequests);

}
