package com.sff.storeserver.domain.review.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StoreReviewResponse {

    // 리뷰 정보
    private LocalDateTime createdDate;
    private int score;
    private String content;

    // 회원 정보
    private Long userId;
    private String userName;
    private String userProfileUrl;

    // 주문 정보
    private Long orderId;
    private List<String> menu;

    public StoreReviewResponse(LocalDateTime createdDate, int score, String content, Long userId, Long orderId) {
        this.createdDate = createdDate;
        this.score = score;
        this.content = content;
        this.userId = userId;
        this.orderId = orderId;
    }
}
