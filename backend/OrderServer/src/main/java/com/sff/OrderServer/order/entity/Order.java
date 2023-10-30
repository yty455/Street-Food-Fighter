package com.sff.OrderServer.order.entity;

import com.sff.OrderServer.bucket.entity.Bucket;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderId;

    @Column(nullable = false)
    private Integer receiptNumber;

    @Column(nullable = false) // not null 설정
    @Enumerated(EnumType.STRING)
    private OrderState state;

    private String requirement;

    @OneToOne
    @Column(name = "BUCKET_ID", nullable = false)
    private Bucket bucket;

    @Column(nullable = false)
    private Long userId;

    @Column(nullable = false)
    private Long storeId;
}
