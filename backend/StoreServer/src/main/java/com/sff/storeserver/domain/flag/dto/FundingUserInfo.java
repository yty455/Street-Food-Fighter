package com.sff.storeserver.domain.flag.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FundingUserInfo {
    //펀딩한 회원 리스트 ( 닉네임, 등급, 금액, 메뉴 )

    // 회원정보
    private Long userId;
    private String userName;
    private UserGrade userGrade;

    // 주문정보
    private int totalPrice;
    private String menuName;
    private int menuCount;
    private int restCount;

    public void updateUserInfo(String userName, UserGrade userGrade) {
        this.userName = userName;
        this.userGrade = userGrade;
    }
}

/*

userId;
totalPrice;
menuName;
menuCount;
restCount;

 */