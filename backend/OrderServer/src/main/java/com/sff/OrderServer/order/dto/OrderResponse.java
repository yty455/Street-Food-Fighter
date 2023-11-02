package com.sff.OrderServer.order.dto;

import com.sff.OrderServer.bucket.entity.OrderMenu;
import com.sff.OrderServer.order.entity.OrderRecord;
import com.sff.OrderServer.order.entity.OrderState;
import java.time.LocalDateTime;
import lombok.Getter;

@Getter
public class OrderResponse {

    private Long orderId;
    private LocalDateTime createdAt;
    private OrderState orderState;
    private Long storeId;
    private String storeName;
    private String storeUrl;
    private String menuName;
    private Integer menuCount;
    private Integer restCount;
    private Integer bucketTotalPrice;

    public OrderResponse(OrderRecord orderRecord, String storeName, String storeUrl, Integer bucketTotalPrice, OrderMenu orderMenu, Integer restCount) {
        this.orderId = orderRecord.getOrderId();
        this.createdAt = orderRecord.getCreatedAt();
        this.orderState = orderRecord.getState();
        this.storeId = orderRecord.getStoreId();
        this.storeName = storeName;
        this.storeUrl = storeUrl;
        this.bucketTotalPrice = bucketTotalPrice;
        this.menuName = orderMenu.getName();
        this.menuCount = orderMenu.getCount();
        this.restCount = restCount;
    }

}
