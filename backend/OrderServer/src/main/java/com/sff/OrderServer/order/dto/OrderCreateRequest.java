package com.sff.OrderServer.order.dto;

import lombok.Getter;

@Getter
public class OrderCreateRequest {

    private Long bucketId;
    private Long userId;
    private Long storeId;
    private String requirement;
}
