package com.sff.OrderServer.bucket.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class BucketRequest{
    private Long menuId;
    private Integer count;
    private List<Long> optionIds;
}