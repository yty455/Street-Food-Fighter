package com.sff.storeserver.domain.review.dto;

import com.sff.storeserver.domain.store.entity.CategoryType;
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
public class MyReviewResponse {

    // 가게 정보
    private Long storeId;
    private String storeName;
    private CategoryType categoryType;

    // 리뷰 정보
    private LocalDateTime createdDate;
    private int score;
    private String content;

    // 주문 정보
    private Long orderId;
    private List<String> menu;

    public MyReviewResponse(Long storeId, String storeName, LocalDateTime createdDate, int score, String content, Long orderId) {
        this.storeId = storeId;
        this.storeName = storeName;
        this.createdDate = createdDate;
        this.score = score;
        this.content = content;
        this.orderId = orderId;
    }

    public void updateMenu(List<String> menu) {
        this.menu = menu;
    }

}
