package com.sff.OrderServer.order.dto;

import java.util.List;
import lombok.Getter;

@Getter
public class OrderMenuResponse {

    private String name;
    private int price;
    private int count;

    private List<OrderOptionResponse> orderOptionList;

}
