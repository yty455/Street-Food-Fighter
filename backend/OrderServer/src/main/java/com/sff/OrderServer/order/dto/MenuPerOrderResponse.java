package com.sff.OrderServer.order.dto;

import java.util.List;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class MenuPerOrderResponse {

    private Long orderId;
    private List<String> menuList;

    public MenuPerOrderResponse(Long orderId, List<String> menuList) {
        this.orderId = orderId;
        this.menuList = menuList;
    }
}
