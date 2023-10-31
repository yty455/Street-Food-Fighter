package com.sff.storeserver.domain.review.dto;

import com.sff.storeserver.domain.review.entity.Review;
import com.sff.storeserver.domain.store.entity.Store;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StoreReviewResponse {

    private Long storeId;
    private Long userId;
    private Long orderId;

    private String content;

    @Min(0)
    @Min(5)
    private int score;

    public Review toEntity(Store store){
        return Review.builder()
                .store(store)
                .userId(userId)
                .orderId(orderId)
                .content(content)
                .score(score)
                .build();
    }
}
