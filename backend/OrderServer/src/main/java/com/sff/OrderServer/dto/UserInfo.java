package com.sff.OrderServer.dto;

import com.sff.OrderServer.funding.entity.Funding;
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
    private Long id;
    private int amount;

    public UserInfo(OrderRecord orderRecord) {
        this.userId = orderRecord.getUserId();
        this.id = orderRecord.getOrderId();
        this.amount = 0;
    }

    public UserInfo(Funding funding){
        this.userId = funding.getUserId();
        this.id = funding.getFundingId();
        this.amount = funding.getBucket().getTotalPrice();
    }
}
