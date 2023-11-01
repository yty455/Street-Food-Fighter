package com.sff.OrderServer.order.dto;

import com.sff.OrderServer.bucket.entity.OrderOption;
import lombok.Getter;

@Getter
public class OrderOptionResponse {

    private String name;
    private int price;

    public OrderOptionResponse(OrderOption orderOption) {
        this.name = orderOption.getName();
        this.price = orderOption.getPrice();
    }
}
