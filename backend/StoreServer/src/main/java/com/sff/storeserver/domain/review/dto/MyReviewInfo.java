package com.sff.storeserver.domain.review.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Builder
@NoArgsConstructor
public class MyReviewInfo {

    // 가게 정보
    private Long storeId;
    private String storeName;

    // 리뷰 정보
    private LocalDateTime createdDate;
    private int score;
    private String content;

    // 주문 정보
    private Long orderId;

    public MyReviewInfo(Long storeId, String storeName, LocalDateTime createdDate, int score, String content, Long orderId) {
        this.storeId = storeId;
        this.storeName = storeName;
        this.createdDate = createdDate;
        this.score = score;
        this.content = content;
        this.orderId = orderId;
    }

}
