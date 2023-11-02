package com.sff.OrderServer.order.dto;

import com.sff.OrderServer.order.entity.OrderRecord;
import com.sff.OrderServer.order.entity.OrderState;
import java.time.LocalDateTime;
import java.util.List;
import lombok.Getter;

@Getter
public class OrderDetailResponse {

    private OrderState state;
    private Long storeId;
    private String storeName;
    private String storeUrl;
    private String storeAddress;;
    private LocalDateTime createAt;
    private String receiptNumber;
    private Long orderId;
    private String requirement;
    private List<OrderItem> orderItemList;
    private int totalPrice;

    public OrderDetailResponse(OrderRecord orderRecord, List<OrderItem> orderItemList) {
        this.state = orderRecord.getState();
        this.storeId = 1L;
        this.storeName = "가게 이름";
        this.storeUrl = "가게 이미지 url";
        this.storeAddress = "가게 주소";
        this.receiptNumber = orderRecord.getReceiptNumber();
        this.orderId = orderRecord.getOrderId();
        this.requirement = orderRecord.getRequirement();
        this.createAt = orderRecord.getCreatedAt();
        this.orderItemList = orderItemList;
        this.totalPrice = orderRecord.getBucket().getTotalPrice();
    }
}
