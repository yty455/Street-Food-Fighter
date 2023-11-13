package com.sff.storeserver.domain.flag.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.sff.storeserver.domain.flag.entity.Flag;
import com.sff.storeserver.domain.flag.entity.FlagType;
import com.sff.storeserver.domain.store.entity.Address;
import com.sff.storeserver.domain.store.entity.Store;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
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
public class FlagRequest {

    private Long storeId;

    private LocalDate date;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm")
    private LocalTime openTime;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm")
    private LocalTime closeTime;

    @NotBlank(message = "상세 주소가 공백입니다.")
    private String address;

    @NotNull(message = "위도 값이 공백입니다.")
    private double lati;
    @NotNull(message = "경도 값이 공백입니다.")
    private double longi;
    private String region1;
    private String region2;
    private String region3;
    private String region4;


    public void setStoreId(Long storeId) {
        this.storeId = storeId;
    }

    public Flag toEntity(Store store) {
        return Flag.builder()
                .store(store)
                .date(date)
                .openTime(openTime)
                .closeTime(closeTime)
                .address(address)
                .lati(lati)
                .longi(longi)
                .addressRegion(new Address(region1, region2, region3, region4))
                .state(FlagType.WAITING)
                .build();
    }
}
