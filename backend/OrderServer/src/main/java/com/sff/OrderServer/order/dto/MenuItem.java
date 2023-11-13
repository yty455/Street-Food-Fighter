package com.sff.OrderServer.order.dto;

import com.sff.OrderServer.bucket.entity.OrderMenu;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class MenuItem {

    private String name;
    private int count;

    public MenuItem(OrderMenu orderMenu) {
        this.name = orderMenu.getName();
        this.count = orderMenu.getCount();
    }

}
