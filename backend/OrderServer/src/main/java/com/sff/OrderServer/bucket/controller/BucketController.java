package com.sff.OrderServer.bucket.controller;

import com.sff.OrderServer.bucket.dto.Item;
import com.sff.OrderServer.bucket.service.BucketService;
import com.sff.OrderServer.utils.ApiResult;
import com.sff.OrderServer.utils.ApiUtils;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class BucketController {

    private final BucketService bucketService;

    @PostMapping("/api/order-server/user/buckets")
    public ApiResult<?> createBucket(@RequestHeader("userId") Long userId, @RequestBody List<Item> items){
        return ApiUtils.success(bucketService.createBucket(userId, items));
    }

    @PutMapping("/api/order-server/user/buckets") // msa
    public ApiResult<?> updateBucket(@RequestHeader("userId") Long userId, @RequestParam Long bucketId){
        bucketService.updateBucketPaymentState(userId, bucketId);
        return ApiUtils.success("bucket 결제 상태로 변경 완료");
    }
}
