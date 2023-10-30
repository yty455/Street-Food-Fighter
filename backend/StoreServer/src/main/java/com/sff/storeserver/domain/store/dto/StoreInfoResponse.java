package com.sff.storeserver.domain.store.dto;

import com.sff.storeserver.domain.store.Store;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.geo.Point;

import java.time.LocalDateTime;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StoreInfoResponse {
    private Long ownerId;
    private String name;
    private String ownerName;
    private String phone;
    private String businessCategory;
    private String information;
    private String introduction;
    private LocalDateTime openTime;
    private LocalDateTime closeTime;
    private String activeArea;
    private Point areaPoint;
    private String storeUrl;
    private String state;

    public static StoreInfoResponse fromEntity(Store store){
        return StoreInfoResponse.builder()
                .ownerId(store.getOwnerId())
                .name(store.getName())
                .phone(store.getPhone())
                .openTime(store.getOpenTime())
                .closeTime(store.getCloseTime())
                .information(store.getInformation())
                .introduction(store.getIntroduction())
                .storeUrl(store.getStoreUrl())
                .build();

    }
}
