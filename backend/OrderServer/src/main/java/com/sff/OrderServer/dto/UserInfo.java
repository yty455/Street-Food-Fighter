package com.sff.OrderServer.dto;

import com.sff.OrderServer.order.entity.OrderRecord;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserInfo {

    private Long userId;
    private Long orderId;
    private int amount;

    public UserInfo(OrderRecord orderRecord) {
        this.userId = orderRecord.getUserId();
        this.orderId = orderRecord.getOrderId();
        this.amount = 0;
    }
}
