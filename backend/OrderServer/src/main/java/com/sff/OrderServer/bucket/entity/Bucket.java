package com.sff.OrderServer.bucket.entity;

import com.sff.OrderServer.bucket.dto.Item;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Bucket {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bucketId;

    private Integer totalPrice;

    @Column(nullable = false)
    @Builder.Default
    private Boolean paymentState = false;

    private Long userId;

    public static Bucket toEntity(Long userId, Integer totalPrice){
        return Bucket.builder()
                .userId(userId)
                .totalPrice(totalPrice)
                .build();
    }
}
