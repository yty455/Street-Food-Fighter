package com.sff.OrderServer.order.dto;

import com.sff.OrderServer.order.entity.OrderRecord;
import com.sff.OrderServer.order.entity.OrderState;
import java.time.LocalDateTime;
import java.util.List;
import lombok.Getter;

@Getter
public class OrderRecordResponse {

    private Long orderId;
    private String store_name;
    private String store_url;
    private String active_area;
    private String receiptNumber;
    private OrderState state;
    private String requirement;
    private LocalDateTime orderDate;
    private List<OrderMenuResponse> orderMenuResponseList;

    public OrderRecordResponse(OrderRecord orderRecord, List<OrderMenuResponse> orderMenuResponseList) {
        this.orderId = orderRecord.getOrderId();
        this.store_name = "받아와야 함_가게이름";
        this.store_url = "받아와야 함_가게 이미지 url";
        this.active_area = "받아와야 함_가게 주소";
        this.receiptNumber = orderRecord.getReceiptNumber();
        this.state = orderRecord.getState();
        this.requirement = orderRecord.getRequirement();
        this.orderDate = orderRecord.getOrderDate();
        this.orderMenuResponseList = orderMenuResponseList;
    }
}
