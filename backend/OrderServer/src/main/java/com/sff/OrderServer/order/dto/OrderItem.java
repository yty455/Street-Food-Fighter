package com.sff.OrderServer.order.dto;

import com.sff.OrderServer.bucket.dto.Option;
import com.sff.OrderServer.bucket.entity.OrderMenu;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class OrderItem {

    private String name;
    private int price;
    private int count;

    private List<Option> orderOptionList;
    private Integer menuTotalPrice;

    public OrderItem(OrderMenu orderMenu, List<Option> orderOptionList, int menuTotalPrice) {
        this.name = orderMenu.getName();
        this.price = orderMenu.getPrice();
        this.count = orderMenu.getCount();
        this.orderOptionList = orderOptionList;
        this.menuTotalPrice = menuTotalPrice;
    }

    public OrderItem(OrderMenu orderMenu) {
        this.name = orderMenu.getName();
        this.count = orderMenu.getCount();
    }
}
