package com.sff.storeserver.domain.flag.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.sff.storeserver.domain.flag.entity.Flag;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FlagDetailResponse {

    // 펀딩 정보
    private LocalDate date;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm")
    private LocalTime openTime;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm")
    private LocalTime closeTime;
    private String address;

    // 펀딩 주문 정보
    // 총 펀딩 금액, 펀딩한 회원 등급 ( 등급별 명수 ), 펀딩한 회원 리스트 ( 닉네임, 등급, 금액, 메뉴 )
    private int fundingAmount;

    public static FlagDetailResponse fromEntity(Flag flag) {
        return FlagDetailResponse.builder()
                .date(flag.getDate())
                .openTime(flag.getOpenTime())
                .closeTime(flag.getCloseTime())
                .address(flag.getAddress())
                .build();
    }
}
