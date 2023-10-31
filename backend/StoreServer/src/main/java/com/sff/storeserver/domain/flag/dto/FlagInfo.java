package com.sff.storeserver.domain.flag.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.geo.Point;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FlagInfo {

    private LocalDate date;
    private LocalTime openTime;
    private LocalTime closeTime;
    private int fundraising_amount;
    private String address;
    private Point areaPoint;
    private String state;
}
