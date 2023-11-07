package com.sff.OrderServer.funding.dto;

import com.sff.OrderServer.funding.entity.Funding;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class FundingRequest {
    private Long bucketId;
    private Long storeId;
    private Long flagId;
    private String requirement;

}
