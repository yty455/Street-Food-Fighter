package com.sff.OrderServer.funding.dto;

import com.sff.OrderServer.bucket.dto.Option;
import com.sff.OrderServer.bucket.entity.OrderMenu;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class FundingItem {
    private String name;
    private Integer price;
    private Integer count;
    private List<Option> orderOptionList;
    private Integer menuTotalPrice;

    public FundingItem(OrderMenu orderMenu, List<Option> options, Integer menuTotalPrice){
        this.name = orderMenu.getName();
        this.price = orderMenu.getPrice();
        this.count = orderMenu.getCount();
        this.orderOptionList = options;
        this.menuTotalPrice = menuTotalPrice;
    }
}
