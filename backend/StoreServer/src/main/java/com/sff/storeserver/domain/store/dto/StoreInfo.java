package com.sff.storeserver.domain.store.dto;

import com.sff.storeserver.domain.store.entity.Store;
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
public class StoreInfo {
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

    public Store toEntity() {
        return Store.builder()
                .ownerId(ownerId)
                .name(name)
                .ownerName(ownerName)
                .phone(phone)
                .businessCategory(businessCategory)
                .information(information)
                .introduction(introduction)
                .openTime(openTime)
                .closeTime(closeTime)
                .activeArea(activeArea)
                .areaPoint(areaPoint)
                .storeUrl(storeUrl)
                .state(state).build();
    }
}
