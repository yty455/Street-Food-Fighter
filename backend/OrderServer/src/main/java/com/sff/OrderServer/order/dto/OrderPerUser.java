package com.sff.OrderServer.order.dto;

import lombok.Getter;

@Getter
public class OrderPerUser {

    private Long userId;
    private Integer orderCount;

    public OrderPerUser(Long userId, Integer orderCount) {
        this.userId = userId;
        this.orderCount = orderCount;
    }
}
