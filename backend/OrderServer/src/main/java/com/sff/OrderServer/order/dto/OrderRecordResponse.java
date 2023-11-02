package com.sff.OrderServer.order.dto;

import com.sff.OrderServer.order.entity.OrderRecord;
import com.sff.OrderServer.order.entity.OrderState;
import java.time.LocalDateTime;
import java.util.List;
import lombok.Getter;

@Getter
public class OrderRecordResponse {

    private OrderState state;
    private String storeName;
    private String storeUrl;
    private String activeArea;
    private LocalDateTime createAt;
    private String receiptNumber;
    private Long orderId;
    private String requirement;
    private List<OrderMenuResponse> orderMenuResponseList;
    private int totalPrice;

    public OrderRecordResponse(OrderRecord orderRecord, List<OrderMenuResponse> orderMenuResponseList) {
        this.state = orderRecord.getState();
        this.storeName = "받아와야 함_가게이름";
        this.storeUrl = "받아와야 함_가게 이미지 url";
        this.activeArea = "받아와야 함_가게 주소";
        this.receiptNumber = orderRecord.getReceiptNumber();
        this.orderId = orderRecord.getOrderId();
        this.requirement = orderRecord.getRequirement();
        this.createAt = orderRecord.getCreatedAt();
        this.orderMenuResponseList = orderMenuResponseList;
        this.totalPrice = orderRecord.getBucket().getTotalPrice();
    }
}
