package com.sff.OrderServer.funding.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class FundingUser {
    private Long userId;
    private Integer totalPrice;
    private String menuName;
    private Integer menuCount;
    private Integer restCount;
}
