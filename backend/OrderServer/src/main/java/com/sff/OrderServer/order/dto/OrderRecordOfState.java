package com.sff.OrderServer.order.dto;

import com.sff.OrderServer.order.entity.OrderRecord;
import com.sff.OrderServer.order.entity.OrderState;
import com.sff.OrderServer.order.entity.ReviewState;
import java.time.LocalDateTime;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class OrderRecordOfState {

    private Long orderId;
    private String receiptNumber;
    private OrderState orderState;
    private ReviewState reviewState;
    private String requirement;
    private LocalDateTime orderDate;
    private List<MenuItem> orderMenuList;
    private Integer totalPrice;
    private Integer totalMenuCount;

    public OrderRecordOfState(OrderRecord orderRecord, List<MenuItem> orderMenuList) {
        this.orderId = orderRecord.getOrderId();
        this.receiptNumber = orderRecord.getReceiptNumber();
        this.orderState = orderRecord.getOrderState();
        this.reviewState = orderRecord.getReviewState();
        this.requirement = orderRecord.getRequirement();
        this.orderDate = orderRecord.getCreatedAt();
        this.orderMenuList = orderMenuList;
        this.totalPrice = orderRecord.getBucket().getTotalPrice();
        this.totalMenuCount = orderMenuList.size();
    }

}
