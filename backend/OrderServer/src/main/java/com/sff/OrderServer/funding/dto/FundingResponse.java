package com.sff.OrderServer.funding.dto;

import com.sff.OrderServer.bucket.entity.OrderMenu;
import com.sff.OrderServer.funding.entity.Funding;
import com.sff.OrderServer.funding.entity.FundingState;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class FundingResponse {
    private Long FundingId;
    private LocalDateTime createdAt;
    private FundingState fundingState;
    private Long storeId;
    private String storeName;
    private String storeUrl;
    private String menuName;
    private Integer menuCount;
    private Integer restCount;
    private Integer bucketTotalPrice;

    public FundingResponse(Funding funding, String storeName, String storeUrl, Integer bucketTotalPrice, OrderMenu orderMenu, Integer restCount){
        this.FundingId = funding.getFundingId();
        this.createdAt = funding.getCreatedAt();
        this.fundingState = funding.getFundingState();
        this.storeId = funding.getStoreId();
        this.storeName = storeName;
        this.storeUrl = storeUrl;
        this.bucketTotalPrice = bucketTotalPrice;
        this.menuName = orderMenu.getName();
        this.menuCount = orderMenu.getCount();
        this.restCount = restCount;
    }
}
