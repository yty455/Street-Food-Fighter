package com.sff.storeserver.domain.store.dto;

import com.sff.storeserver.domain.store.entity.Store;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalTime;
import java.util.List;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StoreDetailResponse {

    // 손님 - 가게 상세 조회  ( 메뉴-가게/정보 , 리뷰 )
    // 가게 기본 정보
    // 가게 이름, 소개, 운영 시간, 전화번호, 위치, 안내
    // 메뉴
    // 리뷰 점수

    private String name;
    private String ownerName;
    private String phone;

    private LocalTime openTime;
    private LocalTime closeTime;
    private String activeArea;
    private String information;
    private String introduction;
    private String storeUrl;

    private List<MenuInfoResponse> menuInfoResponseList;
    private int score;

    public static StoreDetailResponse fromEntity(Store store, List<MenuInfoResponse> menuInfoResponseList, int score) {
        return StoreDetailResponse.builder()
                .name(store.getName())
                .ownerName(store.getOwnerName())
                .phone(store.getPhone())
                .openTime(store.getOpenTime())
                .closeTime(store.getCloseTime())
                .activeArea(store.getActiveArea())
                .information(store.getInformation())
                .introduction(store.getIntroduction())
                .storeUrl(store.getStoreUrl())
                .menuInfoResponseList(menuInfoResponseList)
                .score(score)
                .build();
    }
}
