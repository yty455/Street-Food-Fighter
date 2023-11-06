package com.sff.OrderServer.order.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class OrderCreateResponse {
    private Long orderId;
    private Integer totalPrice;
}
