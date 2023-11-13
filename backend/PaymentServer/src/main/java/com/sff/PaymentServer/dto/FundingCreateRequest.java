package com.sff.PaymentServer.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class FundingCreateRequest {
    private Long bucketId;
    private Long storeId;
    private Long flagId;
    private String requirement;
    private String paymentPassword;
}
