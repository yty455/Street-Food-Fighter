package com.sff.storeserver.domain.store.dto;


import com.sff.storeserver.domain.store.entity.Options;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OptionInfoResponse {
    private Long id;
    private String name;
    private Integer price;

    public static OptionInfoResponse fromEntity(Options options) {
        return OptionInfoResponse.builder()
                .id(options.getId())
                .name(options.getName())
                .price(options.getPrice())
                .build();
    }
}
