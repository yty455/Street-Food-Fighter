package com.sff.storeserver.domain.review.controller;

import com.sff.storeserver.common.error.type.ValidationException;
import com.sff.storeserver.common.utils.ApiResult;
import com.sff.storeserver.common.utils.ApiUtils;
import com.sff.storeserver.domain.review.dto.MyReviewResponse;
import com.sff.storeserver.domain.review.dto.ReviewRequest;
import com.sff.storeserver.domain.review.dto.StoreReviewResponse;
import com.sff.storeserver.domain.review.service.ReviewService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "리뷰 API", description = "리뷰 관련 API")
@RestController
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    @Operation(summary = "손님 - 리뷰 등록", description = "손님 - 리뷰를 등록 합니다.")
    @PostMapping("/api/store-server/user/review")
    public ApiResult<?> createReview(@Valid @RequestBody ReviewRequest storeInfo, BindingResult bindingResult) {

        // 예외처리
        validation(bindingResult);

        reviewService.createReview(storeInfo);

        return ApiUtils.success("리뷰 등록 성공");
    }

    @Operation(summary = "손님 - 내가 쓴 리뷰 조회", description = "손님 - 내가 쓴 리뷰를 조회 합니다.")
    @GetMapping("/api/store-server/user/{userId}/review")
    public ApiResult<?> getMyReviews(@PathVariable("userId") Long userId) {

        List<MyReviewResponse> myReviewResponseList = reviewService.getMyReviews(userId);

        return ApiUtils.success(myReviewResponseList);
    }

    @Operation(summary = "손님 - 가게에 등록된 리뷰 조회", description = "손님 - 가게에 등록된 리뷰를 조회 합니다.")
    @GetMapping("/api/store-server/user/store/{storeId}/review")
    public ApiResult<?> getStoreReviews(@PathVariable("storeId") Long storeId) {

        List<StoreReviewResponse> storeReviewResponseList = reviewService.getStoreReviews(storeId);

        return ApiUtils.success(storeReviewResponseList);
    }

    public void validation(BindingResult bindingResult){
        if (bindingResult.hasErrors()) {
            throw new ValidationException(bindingResult.getFieldErrors());
        }
    }


//// 실패 시 에러 코드, 메시지 리턴 (일반적으로 Service단에서 처리)
//throw new BaseException(new ApiError({에러 메시지},{에러 코드});
//
//    // valid 예외처리
//    public ApiResult<> create(@Valid UserRequest userRequest , BindingResult bindingResult) {
//        if (bindingResult.hasErrors()) {
//            throw new ValidationException(bindingResult.getFieldErrors());
//        }
//        return ApiUtils.success("성공");
//    }


}
