package com.sff.storeserver.domain.store.dto;

import com.sff.storeserver.domain.store.entity.BusinessType;
import com.sff.storeserver.domain.store.entity.CategoryType;
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
    private Long storeId;
    private Long ownerId;
    private String name;
    private String ownerName;
    private String phone;
    private CategoryType category;
    private String businessCategory;

    private LocalTime openTime;
    private LocalTime closeTime;
    private String activeArea;
    private double lati;
    private double longi;
    private String information;
    private String introduction;
    private BusinessType state;

    public static StoreInfoResponse fromEntity(Store store) {
        return StoreInfoResponse.builder()
                .storeId(store.getId())
                .ownerId(store.getOwnerId())
                .name(store.getName())
                .ownerName(store.getOwnerName())
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
                .state(store.getState())
                .build();

    }
}
