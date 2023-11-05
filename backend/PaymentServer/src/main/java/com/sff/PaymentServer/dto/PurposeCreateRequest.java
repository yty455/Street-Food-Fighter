package com.sff.PaymentServer.dto;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class PurposeCreateRequest {
    private Integer amount;
    private Boolean isCharge;
}
