package com.sff.OrderServer.order.dto;

import com.sff.OrderServer.bucket.dto.Option;
import com.sff.OrderServer.bucket.entity.OrderMenu;
import java.util.List;
import lombok.Getter;

@Getter
public class OrderItem {

    private String name;
    private int price;
    private int count;

    private List<Option> orderOptionList;
    private int menuTotalPrice;

    public OrderItem(OrderMenu orderMenu, List<Option> orderOptionList, int menuTotalPrice) {
        this.name = orderMenu.getName();
        this.price = orderMenu.getPrice();
        this.count = orderMenu.getCount();
        this.orderOptionList = orderOptionList;
        this.menuTotalPrice = menuTotalPrice;
    }
}
