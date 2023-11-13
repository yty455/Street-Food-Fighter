package com.sff.storeserver.domain.store.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StoreStartInfo {
    @NotNull(message = "flagId가 필요합니다.")
    private Long flagId;
    @NotNull(message = "lati가 필요합니다.")
    private Double lati;
    @NotNull(message = "longi가 필요합니다.")
    private Double longi;
    @NotNull(message = "위치가 필요합니다.")
    private String activeArea;
    private String region1;
    private String region2;
    private String region3;
    private String region4;

}
