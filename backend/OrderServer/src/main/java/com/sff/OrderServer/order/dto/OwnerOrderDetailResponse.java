package com.sff.OrderServer.order.dto;

import com.sff.OrderServer.order.entity.OrderRecord;
import java.time.LocalDateTime;
import java.util.List;
import lombok.Getter;

@Getter
public class OwnerOrderDetailResponse {

    private Long orderId;
    private Long userId;
    private LocalDateTime createAt;
    private String userNickName;
    private String userGrade;
    private String userPhone;
    private String requirement;
    private List<OrderItem> orderItemList;
    private Integer totalPrice;
    private Long reviewId;
    private String content;
    private Integer score;

    public OwnerOrderDetailResponse(OrderRecord orderRecord, Long userId, String userNickName, String userGrade, String userPhone, Long reviewId, String content, Integer score, List<OrderItem> orderItemList) {
        this.orderId = orderRecord.getOrderId();
        this.userId = userId;
        this.createAt = orderRecord.getCreatedAt();
        this.userNickName = userNickName;
        this.userGrade = userGrade;
        this.userPhone = userPhone;
        this.requirement = orderRecord.getRequirement();
        this.orderItemList = orderItemList;
        this.totalPrice = orderRecord.getBucket().getTotalPrice();
        this.reviewId = reviewId;
        this.content = content;
        this.score = score;
    }
}
