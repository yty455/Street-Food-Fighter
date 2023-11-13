package com.sff.storeserver.domain.store.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class BucketRequest {
    private Long menuId;
    private Integer count;
    private List<Long> optionIds;
}