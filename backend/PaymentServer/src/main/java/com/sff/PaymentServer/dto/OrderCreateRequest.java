package com.sff.PaymentServer.dto;

import lombok.Getter;

public class OrderCreateRequest {

    private Long bucketId;
    private Long storeId;
    private String requirement;
}
