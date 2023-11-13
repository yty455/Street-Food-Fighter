package com.sff.OrderServer.bucket.entity;

import com.sff.OrderServer.bucket.dto.Option;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class OrderOption {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderOptionId;

    @Column(nullable = false)
    private Long optionId;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private Integer price;

    public OrderOption(Option option){
        this.optionId = option.getOptionId();
        this.name = option.getName();
        this.price = option.getPrice();
    }
}
