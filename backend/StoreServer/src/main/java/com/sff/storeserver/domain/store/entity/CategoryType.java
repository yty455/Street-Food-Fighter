package com.sff.storeserver.domain.store.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum CategoryType {
    HOTTEOK("호떡"), FISHBREAD("붕어빵"), SNACKBAR("분식"), TAKOYAKI("타코야끼"), EGGBREAD("계란빵"), STICK("꼬치"),
    GUGHWABREAD("국화빵"), SWEETPOTATO("고구마"), DESSERT("디저트"), TOAST("토스트"), CHICKEN("치킨"),
    MEAT("고기"), KOREANFOOD("한식"), CHINESEFOOD("중식"), WESTERNFOOD("양식"), ETC("기타");
    private final String text;

}
