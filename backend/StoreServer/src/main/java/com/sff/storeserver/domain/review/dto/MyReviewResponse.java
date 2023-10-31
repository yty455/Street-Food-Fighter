package com.sff.storeserver.domain.review.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MyReviewResponse {

    // 가게 정보
    private Long storeId;
    private String storeName;

    // 리뷰 정보
    private LocalDate createdAt;
    private int score;
    private String content;

    private Long orderId;

}
