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
    private Integer totalPrice;

}
