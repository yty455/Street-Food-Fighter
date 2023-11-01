package com.sff.userserver.domain.point.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Point {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "POINT_ID")
    private Long id;

    private Long amount;
    private String paymentPassword;


    @Builder
    public Point(Long amount, String paymentPassword) {
        this.amount = amount;
        this.paymentPassword = paymentPassword;
    }

    public static Point create(String paymentPassword) {
        return Point.builder()
                .amount(0L)
                .paymentPassword(paymentPassword)
                .build();
    }
}
