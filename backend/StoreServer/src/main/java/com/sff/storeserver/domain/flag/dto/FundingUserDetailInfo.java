package com.sff.storeserver.domain.flag.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FundingUserDetailInfo {

    // 회원정보
    private String nickname;
    private UserGrade grade;
}
