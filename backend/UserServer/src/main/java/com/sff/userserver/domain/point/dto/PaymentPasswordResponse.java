package com.sff.userserver.domain.point.dto;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PaymentPasswordResponse {
    private String paymentPassword;

    public PaymentPasswordResponse(String paymentPassword) {
        this.paymentPassword = paymentPassword;
    }
}
