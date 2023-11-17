package com.sff.OrderServer.order.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class MenuStatsResponse {

    private String name;
    private int count;
    private Integer menuTotalPrice;

    public MenuStatsResponse(OrderItem orderItem) {
        this.name = orderItem.getName();
        this.count = orderItem.getCount();
        this.menuTotalPrice = orderItem.getMenuTotalPrice();
    }

    public MenuStatsResponse(OrderItem orderItem, MenuStatsResponse menuStatsResponse) {
        this.name = orderItem.getName();
        this.count = orderItem.getCount() + menuStatsResponse.getCount();
        this.menuTotalPrice = orderItem.getMenuTotalPrice() + menuStatsResponse.getMenuTotalPrice();
    }
}
