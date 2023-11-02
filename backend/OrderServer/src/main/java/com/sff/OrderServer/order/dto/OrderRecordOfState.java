package com.sff.OrderServer.order.dto;

import com.sff.OrderServer.order.entity.OrderRecord;
import com.sff.OrderServer.order.entity.OrderState;
import java.time.LocalDateTime;
import java.util.List;
import lombok.Getter;

@Getter
public class OrderRecordOfState {

    private Long orderId;
    private String receiptNumber;
    private OrderState state;
    private String requirement;
    private LocalDateTime orderDate;
    private List<OrderMenuResponse> orderMenuResponseList;
    private int totalPrice;
    private int totalMenuCount;

    public OrderRecordOfState(OrderRecord orderRecord, List<OrderMenuResponse> orderMenuResponseList) {
        this.orderId = orderRecord.getOrderId();
        this.receiptNumber = orderRecord.getReceiptNumber();
        this.state = orderRecord.getState();
        this.requirement = orderRecord.getRequirement();
        this.orderDate = orderRecord.getCreatedAt();
        this.orderMenuResponseList = orderMenuResponseList;
        this.totalPrice = orderRecord.getBucket().getTotalPrice();
        this.totalMenuCount = orderMenuResponseList.size();
    }

}
