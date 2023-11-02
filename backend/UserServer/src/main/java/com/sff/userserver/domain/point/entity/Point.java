package com.sff.userserver.domain.point.entity;

import com.sff.userserver.global.error.type.BaseException;
import com.sff.userserver.global.utils.ApiError;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Point {
    private static final int MAX_POINTS = 2_100_000_000;
    private static final int MIN_POINTS = 0;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "POINT_ID")
    private Long id;

    private Integer amount;
    private String paymentPassword;


    @Builder
    public Point(Integer amount, String paymentPassword) {
        this.amount = amount;
        this.paymentPassword = paymentPassword;
    }

    public static Point create(String paymentPassword) {
        return Point.builder()
                .amount(MIN_POINTS)
                .paymentPassword(paymentPassword)
                .build();
    }

    public void deductPoints(Integer amount) {
        checkSufficientPoints(amount);
        this.amount -= amount;
    }

    public void addPoints(Integer amount) {
        checkMaxPointsLimit(amount);
        this.amount += amount;
    }

    private void checkSufficientPoints(Integer amount) {
        if (this.amount < amount) {
            throw new BaseException(new ApiError("보유 포인트가 결제 포인트보다 적습니다.", 1121));
        }
    }

    private void checkMaxPointsLimit(Integer amount) {
        if ((long) this.amount + amount > MAX_POINTS) {
            throw new BaseException(new ApiError("포인트의 최대 보유 한도는 21억원 입니다.", 1122));
        }
    }
}
