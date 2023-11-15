package com.sff.OrderServer.funding.dto;

import com.sff.OrderServer.bucket.entity.Bucket;
import com.sff.OrderServer.bucket.entity.OrderMenu;
import com.sff.OrderServer.funding.entity.FundToOrderState;
import com.sff.OrderServer.funding.entity.Funding;
import com.sff.OrderServer.funding.entity.FundingState;
import java.time.LocalDateTime;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class FundingResponse {
    private Long FundingId;
    private LocalDateTime createdAt;
    private FundingState fundingState;
    private FundToOrderState fundToOrderState;
    private Long storeId;
    private String storeName;
    private String categoryType;
    private String menuName;
    private Integer menuCount;
    private Integer restCount;
    private Integer bucketTotalPrice;

    public FundingResponse(Funding funding, String storeName, String categoryType, Integer bucketTotalPrice, OrderMenu orderMenu, Integer restCount){
        this.FundingId = funding.getFundingId();
        this.createdAt = funding.getCreatedAt();
        this.fundingState = funding.getFundingState();
        this.fundToOrderState = funding.getOrderState();
        this.storeId = funding.getStoreId();
        this.storeName = storeName;
        this.categoryType = categoryType;
        this.bucketTotalPrice = bucketTotalPrice;
        this.menuName = orderMenu.getName();
        this.menuCount = orderMenu.getCount();
        this.restCount = restCount;
    }
}
