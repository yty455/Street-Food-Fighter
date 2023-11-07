package com.sff.PaymentServer.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class FundingCreateResponse {
    private Long fundingId;
    private Integer totalPrice;
}
