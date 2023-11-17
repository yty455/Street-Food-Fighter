package com.sff.storeserver.domain.store.dto;

import com.sff.storeserver.domain.flag.dto.FlagResponse;
import com.sff.storeserver.domain.flag.entity.Flag;
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
public class FlagStoreInfoResponse {
    // 깃발 정보
    private FlagResponse flag;

    // 가게 정보
    private Long ownerId;
    private Long storeId;
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

    private Double score;

    public static FlagStoreInfoResponse fromEntity(Flag flag) {
        Store store = flag.getStore();
        return FlagStoreInfoResponse.builder()
                .flag(FlagResponse.fromEntity(flag))
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

    public void updateScore(Double score) {
        this.score = score == null ? 0D : score;
    }
}
