package com.sff.storeserver.domain.store.controller;

import com.sff.storeserver.common.utils.ApiResult;
import com.sff.storeserver.common.utils.ApiUtils;
import com.sff.storeserver.domain.flag.dto.FlagMSAResponse;
import com.sff.storeserver.domain.review.dto.ReviewMSAResponse;
import com.sff.storeserver.domain.store.dto.StoreMSARequest;
import com.sff.storeserver.domain.store.dto.StoreMSAResponse;
import com.sff.storeserver.domain.store.service.StoreMSAService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "가게 서버 MSA API", description = "가게 서버 MSA 관련 API")
@RestController
@RequestMapping("/api/store-service/msa")
@RequiredArgsConstructor
public class StoreMSAController {

    private final StoreMSAService storeMSAService;

    @Operation(summary = "가게 정보 조회", description = "가게 ID로 가게 정보를 조회합니다.")
    @PostMapping("/store")
    public ApiResult<?> getStores(@RequestBody StoreMSARequest storeMSARequest) {
        List<StoreMSAResponse> storeMSAResponses = storeMSAService.getStores(storeMSARequest.getStoreIds());
        return ApiUtils.success(storeMSAResponses);
    }

    @Operation(summary = "리뷰 정보 조회", description = "주문 ID로 리뷰 정보를 조회합니다.")
    @GetMapping("/review/{orderId}")
    public ApiResult<?> getReview(@PathVariable Long orderId) {
        ReviewMSAResponse reviewMSAResponse = storeMSAService.getReview(orderId);
        return ApiUtils.success(reviewMSAResponse);
    }

    @Operation(summary = "깃발 정보 조회", description = "깃발 ID로 깃발 정보를 조회합니다.")
    @GetMapping("/flag/{flagId}")
    public ApiResult<?> getFlag(@PathVariable Long flagId) {
        FlagMSAResponse flagMSAResponse = storeMSAService.getFlag(flagId);
        return ApiUtils.success(flagMSAResponse);
    }

}
