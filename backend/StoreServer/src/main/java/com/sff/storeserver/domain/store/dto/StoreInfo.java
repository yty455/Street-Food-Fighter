package com.sff.storeserver.domain.store.dto;

import com.sff.storeserver.domain.store.entity.Store;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StoreInfo {
    private Long ownerId;
    private String name;
    private String ownerName;
    private String phone;
    private String businessCategory;
    private String category;
    private String information;
    private String introduction;
    private LocalDateTime openTime;
    private LocalDateTime closeTime;
    private String activeArea;
    //    private Point areaPoint;
    private double lati;
    private double longi;
    private String storeUrl;
    private String state;

    public Store toEntity() {
        return Store.builder()
                .ownerId(ownerId)
                .name(name)
                .ownerName(ownerName)
                .phone(phone)
                .category(category)
                .businessCategory(businessCategory)
                .information(information)
                .introduction(introduction)
                .openTime(openTime)
                .closeTime(closeTime)
                .activeArea(activeArea)
//                .areaPoint(areaPoint)
                .lati(lati)
                .longi(longi)
                .storeUrl(storeUrl)
                .state(state).build();
    }
}
