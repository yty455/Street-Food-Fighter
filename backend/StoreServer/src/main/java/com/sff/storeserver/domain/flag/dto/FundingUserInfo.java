package com.sff.storeserver.domain.flag.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FundingUserInfo {
    //펀딩한 회원 리스트 ( 닉네임, 등급, 금액, 메뉴 )
    private String userName;
    private UserGrade userGrade;
    private int totalPrice;
    List<FundingMenuInfo> fundingMenuInfoList;
}
