package com.sff.OrderServer.bucket.dto;

import com.sff.OrderServer.bucket.entity.OrderOption;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Option {
    private Long optionId;
    private String name;
    private Integer price;

    public Option(OrderOption orderOption) {
        this.optionId = orderOption.getOptionId();
        this.name = orderOption.getName();
        this.price = orderOption.getPrice();
    }
}
