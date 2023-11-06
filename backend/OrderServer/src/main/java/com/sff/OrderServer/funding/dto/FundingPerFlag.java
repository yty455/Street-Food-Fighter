package com.sff.OrderServer.funding.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class FundingPerFlag {
    private Long flagId;
    private Integer amount;
}
