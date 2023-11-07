package com.sff.storeserver.domain.store.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
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
public class StoreInfo {
    private Long ownerId;
    private String name;
    private String ownerName;
    private String phone;
    private String businessCategory;
    private CategoryType category;
    private String information;
    private String introduction;
    //    @NotNull(message = "마감 시간은 필수입니다.")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm")
    private LocalTime openTime;
    //    @NotNull(message = "마감 시간은 필수입니다.")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm")
    private LocalTime closeTime;
    private String activeArea;
    //    private Point areaPoint;
    private double lati;
    private double longi;
    private String storeUrl;

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
                .state(BusinessType.CLOSE).build();
    }
}
