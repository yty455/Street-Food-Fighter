package com.sff.storeserver.domain.store.dto;

import com.sff.storeserver.domain.store.entity.Store;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalTime;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StoreInfoResponse {
    private Long ownerId;
    private String name;
    private String ownerName;
    private String phone;
    private String category;
    private String businessCategory;

    private LocalTime openTime;
    private LocalTime closeTime;
    private String activeArea;
    private double lati;
    private double longi;
    private String information;
    private String introduction;
    //    private Point areaPoint;
    private String storeUrl;
    private String state;

    public static StoreInfoResponse fromEntity(Store store) {
        return StoreInfoResponse.builder()
                .ownerId(store.getOwnerId())
                .name(store.getName())
                .phone(store.getPhone())
                .category(store.getCategory())
                .businessCategory(store.getBusinessCategory())
                .openTime(store.getOpenTime())
                .closeTime(store.getCloseTime())
                .activeArea(store.getActiveArea())
                .lati(store.getLati())
                .longi(store.getLongi())
                .information(store.getInformation())
                .introduction(store.getIntroduction())
                .storeUrl(store.getStoreUrl())
                .build();

    }
}
