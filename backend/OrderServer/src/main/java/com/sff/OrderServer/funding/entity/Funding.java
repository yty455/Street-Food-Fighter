package com.sff.OrderServer.funding.entity;


import com.sff.OrderServer.bucket.entity.Bucket;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.PrimaryKeyJoinColumn;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Funding {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long fundingId;

    @OneToOne
    @PrimaryKeyJoinColumn(name = "BUCKET_ID")
    private Bucket bucket;

    @Column(nullable = false)
    private Long storeId;

    @Column(nullable = false)
    private Long flagId;

    @Column(nullable = false)
    private Long userId;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private FundingState fundingState;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private FundToOrderState orderState;
}
