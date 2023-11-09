package com.sff.OrderServer.order.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class OrderPerUser {

    private Long memberId;
    private Integer orderCount;

    public OrderPerUser(Long memberId, Integer orderCount) {
        this.memberId = memberId;
        this.orderCount = orderCount;
    }
}
