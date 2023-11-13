package com.sff.PaymentServer.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class OrderCreateRequest {

    private Long bucketId;
    private Long storeId;
    private String requirement;
    private String paymentPassword;
}
