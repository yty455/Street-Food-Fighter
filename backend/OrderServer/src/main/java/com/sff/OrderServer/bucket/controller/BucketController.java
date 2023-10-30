package com.sff.OrderServer.bucket.controller;

import com.sff.OrderServer.bucket.dto.Item;
import com.sff.OrderServer.bucket.service.BucketService;
import com.sff.OrderServer.utils.ApiResult;
import com.sff.OrderServer.utils.ApiUtils;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class BucketController {

    private final BucketService bucketService;

    @PostMapping("/api/order-server/user/buckets")
    public ApiResult<?> createbucket(@RequestHeader("userId") Long userId, @RequestBody List<Item> items){
        bucketService.createBucket(userId, items);
        return ApiUtils.success("바구니 생성 및 저장 성공");
    }

}
