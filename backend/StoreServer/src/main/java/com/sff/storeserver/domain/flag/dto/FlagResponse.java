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
public class FlagResponse {

    private Long flagId;

    // 깃발 정보
    private LocalDate date;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm")
    private LocalTime openTime;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm")
    private LocalTime closeTime;
    private String address;

    // 펀딩 정보
    private int fundingAmount;

    public static FlagResponse fromEntity(Flag flag, int fundingAmount) {
        return FlagResponse.builder()
                .flagId(flag.getId())
                .date(flag.getDate())
                .openTime(flag.getOpenTime())
                .closeTime(flag.getCloseTime())
                .address(flag.getAddress())
                .fundingAmount(fundingAmount)
                .build();
    }
}
