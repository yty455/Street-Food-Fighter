package com.sff.storeserver.domain.review.controller;

import com.sff.storeserver.common.BasicResponse;
import com.sff.storeserver.domain.review.service.ReviewService;
import com.sff.storeserver.domain.store.dto.StoreInfo;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "리뷰 API", description = "리뷰 관련 API")
@RestController
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    @Operation(summary = "손님 - 리뷰 등록", description = "손님 - 리뷰를 등록 합니다.")
    @PostMapping("/api/owner/store")
    public ResponseEntity<BasicResponse> createReview(@RequestBody StoreInfo storeInfo) {

        reviewService.createReview();

        BasicResponse basicResponse = BasicResponse.builder()
                .message("리뷰 등록 성공")
                .build();

        return new ResponseEntity<>(basicResponse, basicResponse.getHttpStatus());
    }
}
