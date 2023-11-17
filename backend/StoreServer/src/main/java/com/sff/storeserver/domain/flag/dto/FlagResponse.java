package com.sff.storeserver.domain.flag.dto;

import com.sff.storeserver.domain.flag.entity.Flag;
import com.sff.storeserver.domain.flag.entity.FlagType;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FlagResponse {

    private Long flagId;

    // 깃발 정보
    private LocalDate date;
    private LocalTime openTime;
    private LocalTime closeTime;
    private String address;
    private double lati;
    private double longi;
    @Enumerated(EnumType.STRING)
    private FlagType state;

    // 펀딩 정보
    private int fundingAmount;

    public static FlagResponse fromEntity(Flag flag, int fundingAmount) {
        return FlagResponse.builder()
                .flagId(flag.getId())
                .date(flag.getDate())
                .openTime(flag.getOpenTime())
                .closeTime(flag.getCloseTime())
                .address(flag.getAddress())
                .lati(flag.getLati())
                .longi(flag.getLongi())
                .state(flag.getState())
                .fundingAmount(fundingAmount)
                .build();
    }

    public static FlagResponse fromEntity(Flag flag) {
        return FlagResponse.builder()
                .flagId(flag.getId())
                .date(flag.getDate())
                .openTime(flag.getOpenTime())
                .closeTime(flag.getCloseTime())
                .address(flag.getAddress())
                .lati(flag.getLati())
                .longi(flag.getLongi())
                .state(flag.getState())
                .build();
    }
}
