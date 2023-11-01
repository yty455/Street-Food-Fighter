package com.sff.storeserver.domain.review.dto;

import com.sff.storeserver.domain.review.entity.Review;
import com.sff.storeserver.domain.store.entity.Store;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReviewRequest {

    private Long storeId;
    private Long userId;
    private Long orderId;

    private String content;

    @Max(value = 5, message = "리뷰의 점수는 0~5사이의 정수만 가능합니다.")
    @Min(value = 0, message = "리뷰의 점수는 0~5사이의 정수만 가능합니다.")
    private int score;

    public Review toEntity(Store store) {
        return Review.builder()
                .store(store)
                .userId(userId)
                .orderId(orderId)
                .content(content)
                .score(score)
                .build();
    }
}
