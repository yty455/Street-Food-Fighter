package com.sff.OrderServer.bucket.dto;

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
}
