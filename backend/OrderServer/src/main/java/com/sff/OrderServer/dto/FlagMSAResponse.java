package com.sff.OrderServer.dto;

import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class FlagMSAResponse {

    private String storeName;
    private String categoryType;
    private String flagAddress;
    private LocalDate date;

}