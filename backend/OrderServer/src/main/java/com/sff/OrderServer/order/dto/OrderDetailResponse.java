package com.sff.OrderServer.order.dto;

import com.sff.OrderServer.dto.StoreMSAResponse;
import com.sff.OrderServer.order.entity.OrderRecord;
import com.sff.OrderServer.order.entity.OrderState;
import java.time.LocalDateTime;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class OrderDetailResponse {

    private OrderState state;
    private Long storeId;
    private String storeName;
    private String categoryType;
    private String storeAddress;
    private LocalDateTime createAt;
    private String receiptNumber;
    private Long orderId;
    private String requirement;
    private List<OrderItem> orderItemList;
    private Integer totalPrice;

    public OrderDetailResponse(OrderRecord orderRecord, List<OrderItem> orderItemList, StoreMSAResponse storeMSAResponse) {
        this.state = orderRecord.getOrderState();
        this.storeId = storeMSAResponse.getStoreId();
        this.storeName = storeMSAResponse.getName();
        this.categoryType = storeMSAResponse.getCategoryType();
        this.storeAddress = storeMSAResponse.getActiveArea();
        this.receiptNumber = orderRecord.getReceiptNumber();
        this.orderId = orderRecord.getOrderId();
        this.requirement = orderRecord.getRequirement();
        this.createAt = orderRecord.getCreatedAt();
        this.orderItemList = orderItemList;
        this.totalPrice = orderRecord.getBucket().getTotalPrice();
    }
}
