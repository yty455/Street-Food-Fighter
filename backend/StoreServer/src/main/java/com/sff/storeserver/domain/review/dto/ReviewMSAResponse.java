package com.sff.storeserver.domain.review.dto;

import com.sff.storeserver.domain.review.entity.Review;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReviewMSAResponse {

    private Long reviewId;
    private Long userId;
    private int score;
    private String content;


    public static ReviewMSAResponse fromEntity(Review review) {
        return ReviewMSAResponse.builder()
                .reviewId(review.getId())
                .userId(review.getUserId())
                .score(review.getScore())
                .content(review.getContent()).build();
    }
}
