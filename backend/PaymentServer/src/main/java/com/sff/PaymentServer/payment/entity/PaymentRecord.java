package com.sff.PaymentServer.payment.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class PaymentRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique=true, nullable=false)
    private String paymentId; // 결제일시-사용자ID-일련번호

    @Column(nullable = false)
    private Long userId;

    @Column(nullable = false)
    private Long ownerId;

    @Column(nullable = false)
    private Integer price;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PaymentState state;

    private Long fundingId;

    private Long orderId;

    @CreationTimestamp
    private LocalDateTime createdAt;

    public void updateState(PaymentState paymentState){
        this.state = paymentState;
    }
}
