package com.sff.OrderServer.funding.dto;

import com.sff.OrderServer.funding.entity.FundingState;
import java.time.LocalDateTime;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FundingDetailResponse {
    private FundingState state;
    private Long storeId;

    private String storeName;
    private String storeUrl;

    private String flagAddress;
    private LocalDateTime flagDate;

    private LocalDateTime createAt;
    private String requirement;
    private List<FundingItem> fundingItemList;
    private Integer totalPrice;
}
