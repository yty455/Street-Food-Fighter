package com.sff.storeserver.domain.review.controller;

import com.sff.storeserver.common.aop.UserIdHolder;
import com.sff.storeserver.common.aop.UserIdRequired;
import com.sff.storeserver.common.error.type.ValidationException;
import com.sff.storeserver.common.utils.ApiResult;
import com.sff.storeserver.common.utils.ApiUtils;
import com.sff.storeserver.domain.review.dto.MyReviewResponse;
import com.sff.storeserver.domain.review.dto.ReviewRequest;
import com.sff.storeserver.domain.review.dto.StoreReviewResponse;
import com.sff.storeserver.domain.review.service.ReviewService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Slice;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@Tag(name = "리뷰 API", description = "리뷰 관련 API")
@RestController
@RequestMapping("/api/store-service")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    @Operation(summary = "손님 - 리뷰 등록", description = "손님 - 리뷰를 등록 합니다.")
    @PostMapping("/review")
    @UserIdRequired
    public ApiResult<?> createReview(@Valid @RequestBody ReviewRequest reviewRequest, BindingResult bindingResult, UserIdHolder userIdHolder) {

        // 예외처리
        validation(bindingResult);

        reviewService.createReview(reviewRequest, userIdHolder.getUserId());

        return ApiUtils.success("리뷰 등록 성공");
    }

    @Operation(summary = "손님 - 내가 쓴 리뷰 조회", description = "손님 - 내가 쓴 리뷰를 조회 합니다.")
    @GetMapping("/review")
    @UserIdRequired
    public ApiResult<?> getMyReviews(UserIdHolder userIdHolder,
                                     @RequestParam @Parameter(name = "page", description = "요청하는 페이지") int page,
                                     @RequestParam @Parameter(name = "size", description = "가져오려는 알림 개수") int size) {

        Page<MyReviewResponse> myReviewResponseList = reviewService.getMyReviews(userIdHolder.getUserId(), page, size);

        return ApiUtils.success(myReviewResponseList);
    }

    @Operation(summary = "손님 - 가게에 등록된 리뷰 조회", description = "손님 - 가게에 등록된 리뷰를 조회 합니다.")
    @GetMapping("/store/{storeId}/review")
    public ApiResult<?> getStoreReviews(@PathVariable("storeId") Long storeId,
                                        @RequestParam @Parameter(name = "page", description = "요청하는 페이지") int page,
                                        @RequestParam @Parameter(name = "size", description = "가져오려는 알림 개수") int size) {

        Slice<StoreReviewResponse> storeReviewResponseList = reviewService.getStoreReviews(storeId, page, size);

        return ApiUtils.success(storeReviewResponseList);
    }

    public void validation(BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new ValidationException(bindingResult.getFieldErrors());
        }
    }

}
