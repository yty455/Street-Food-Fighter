package com.sff.storeserver.domain.flag.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FundingMenuInfo {
    // 펀딩 메뉴 이름, 개수
    private String menuName;
    private int count;
}
