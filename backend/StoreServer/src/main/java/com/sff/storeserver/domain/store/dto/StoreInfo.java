package com.sff.storeserver.domain.store.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.sff.storeserver.domain.store.entity.Address;
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
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm")
    private LocalTime openTime;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm")
    private LocalTime closeTime;
    private String activeArea;
    private double lati;
    private double longi;


    /*
        "ownerId": 1,
    "name": "가게이름",
    "ownerName": "사장이름",
    "phone": "010-1234-1234",
    "businessCategory": "푸드트럭",
    "category": "붕어빵",
    "openTime": "10:00",
    "closeTime": "16:00",

     */

    public Store toEntity() {
        return Store.builder()
                .ownerId(ownerId)
                .name(name)
                .ownerName(ownerName)
                .phone(phone)
                .category(category)
                .businessCategory(businessCategory)
                .information("")
                .introduction("")
                .openTime(openTime)
                .closeTime(closeTime)
                .activeArea("")
                .lati(0)
                .longi(0)
                .address(new Address("", "", "", ""))
                .state(BusinessType.CLOSE).build();
    }
}
