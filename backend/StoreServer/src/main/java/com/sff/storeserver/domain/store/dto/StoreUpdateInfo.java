package com.sff.storeserver.domain.store.dto;


import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalTime;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StoreUpdateInfo {
    @NotBlank(message = "가게이름이 공백입니다.")
    private String name;
    @NotBlank(message = "대표이름이 공백입니다.")
    private String ownerName;
    @NotBlank(message = "휴대폰 번호가 공백입니다.")
    private String phone;
    @NotBlank(message = "오픈시간이 공백입니다.")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm")
    private LocalTime openTime;
    @NotBlank(message = "오픈시간이 공백입니다.")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm")
    private LocalTime closeTime;
    private String information;
    private String introduction;
}
