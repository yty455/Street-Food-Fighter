package com.sff.storeserver.domain.store.dto;


import com.sff.storeserver.domain.store.entity.Menu;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BucketResponse {
    private Long menuId;
    private String name;
    private Integer price;
    private String menuUrl;
    private Integer count;
    private List<BucketOptionResponse> optionList;

    public static BucketResponse fromEntity(Menu menu, List<BucketOptionResponse> bucketOptionResponse, Integer count) {
        return BucketResponse.builder()
                .menuId(menu.getId())
                .name(menu.getName())
                .price(menu.getPrice())
                .menuUrl(menu.getMenuUrl())
                .count(count)
                .optionList(bucketOptionResponse)
                .build();
    }
}
