package com.sff.OrderServer.order.entity;

import com.sff.OrderServer.bucket.entity.Bucket;
import com.sff.OrderServer.order.dto.OrderCreateRequest;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class OrderRecord {

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

    @Column(nullable = false)
    private LocalDateTime orderDate;

    public static OrderRecord toEntity(OrderCreateRequest orderCreateRequest, Integer orderCount) {
        // bucketId 추가하는 코드 추가
        return OrderRecord.builder()
                .receiptNumber(orderCount + 1)
                .state(OrderState.WAITING)
                .requirement(orderCreateRequest.getRequirement())
                .userId(orderCreateRequest.getUserId())
                .storeId(orderCreateRequest.getStoreId())
                .orderDate(LocalDateTime.now())
                .build();
    }
}
