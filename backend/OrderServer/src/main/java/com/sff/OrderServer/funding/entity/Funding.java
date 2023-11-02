package com.sff.OrderServer.funding.entity;


import com.sff.OrderServer.bucket.entity.Bucket;
import com.sff.OrderServer.funding.dto.FundingRequest;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.UpdateTimestamp;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Funding {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long fundingId;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "BUCKET_ID")
    private Bucket bucket;

    @Column(nullable = false)
    private Long storeId;

    @Column(nullable = false)
    private Long flagId;

    @Column(nullable = false)
    private Long userId;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    @Builder.Default
    private FundingState fundingState = FundingState.WAITING;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    @Builder.Default
    private FundToOrderState orderState = FundToOrderState.BEFORE_ORDER;

    @CreationTimestamp
    private LocalDateTime createdAt;

    private String requirement;

    public Funding(Bucket bucket, FundingRequest fundingRequest, Long userId){
        this.bucket = bucket;
        this.storeId = fundingRequest.getStoreId();
        this.flagId = fundingRequest.getFlagId();
        this.userId = userId;
        this.requirement = fundingRequest.getRequirement();
        this.fundingState = FundingState.WAITING;
        this.orderState = FundToOrderState.BEFORE_ORDER;
    }

    public void updateFundingStateWaitting(){
        this.fundingState = FundingState.WAITING;
    }
    public void updateFundingStateFailure(){
        this.fundingState = FundingState.FAILURE;
    }
    public void updateFundingStateSuccess(){
        this.fundingState = FundingState.SUCCESS;
    }

    public void updateOrderStateBefore(){
        this. orderState = FundToOrderState.BEFORE_ORDER;
    }
    public void updateOrderStateComplete(){
        this.orderState = FundToOrderState.ORDER_COMPLETED;
    }
    public void updateOrderStateCancled(){
        this.orderState = FundToOrderState.CANCLED;
    }
    public void updateOrderStateFailed(){
        this.orderState = FundToOrderState.FAILED;
    }
}
