package com.sff.OrderServer.order.dto;

import com.sff.OrderServer.bucket.entity.OrderMenu;
import lombok.Getter;

@Getter
public class MenuItem {

    private String name;
    private int count;

    public MenuItem(OrderMenu orderMenu) {
        this.name = orderMenu.getName();
        this.count = orderMenu.getCount();
    }

}
