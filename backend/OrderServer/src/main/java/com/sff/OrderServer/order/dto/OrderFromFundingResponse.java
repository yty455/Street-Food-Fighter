package com.sff.OrderServer.order.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class OrderFromFundingResponse {
    private long orderId;
    private long storeId;
}
