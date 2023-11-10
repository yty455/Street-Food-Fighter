package com.sff.storeserver.domain.store.dto;

import com.sff.storeserver.domain.store.entity.Store;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StoreMSAResponse {
    private Long storeId;
    private String name;
    private String activeArea;

    public static StoreMSAResponse fromEntity(Store store) {
        return StoreMSAResponse.builder()
                .storeId(store.getId())
                .name(store.getName())
                .activeArea(store.getActiveArea()).build();
    }
}
