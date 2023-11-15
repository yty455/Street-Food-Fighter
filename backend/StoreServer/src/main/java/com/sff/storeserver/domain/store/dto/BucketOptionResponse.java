package com.sff.storeserver.domain.store.dto;


import com.sff.storeserver.domain.store.entity.Options;
import lombok.*;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BucketOptionResponse {
    private Long optionId;
    private String name;
    private Integer price;

    public static BucketOptionResponse fromEntity(Options option) {
        return BucketOptionResponse.builder()
                .optionId(option.getId())
                .name(option.getName())
                .price(option.getPrice())
                .build();
    }
}
