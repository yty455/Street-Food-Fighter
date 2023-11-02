package com.sff.OrderServer.order.dto;

import com.sff.OrderServer.bucket.entity.OrderMenu;
import java.util.List;
import lombok.Getter;

@Getter
public class OrderMenuResponse {

    private String name;
    private int price;
    private int count;

    private List<OrderOptionResponse> orderOptionList;
    private int menuTotalPrice;

    public OrderMenuResponse(OrderMenu orderMenu, List<OrderOptionResponse> orderOptionList, int menuTotalPrice) {
        this.name = orderMenu.getName();
        this.price = orderMenu.getPrice();
        this.count = orderMenu.getCount();
        this.orderOptionList = orderOptionList;
        this.menuTotalPrice = menuTotalPrice;
    }
}
