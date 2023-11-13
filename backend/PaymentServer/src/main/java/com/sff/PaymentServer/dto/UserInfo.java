package com.sff.PaymentServer.dto;

import com.sff.PaymentServer.payment.entity.PaymentRecord;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserInfo {
    private Long userId;
    private int amount;

    public UserInfo(PaymentRecord paymentRecord){
        this.userId = paymentRecord.getUserId();
        this.amount = paymentRecord.getPrice();
    }
}