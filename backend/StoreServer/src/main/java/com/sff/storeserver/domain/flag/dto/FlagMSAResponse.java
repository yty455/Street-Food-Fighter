package com.sff.storeserver.domain.flag.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@Builder
@NoArgsConstructor
public class FlagMSAResponse {

    private String storeName;
    private String storeURL;
    private String flagAddress;
    private LocalDate date;

    public FlagMSAResponse(String storeName, String storeURL, String flagAddress, LocalDate date) {
        this.storeName = storeName;
        this.storeURL = storeURL;
        this.flagAddress = flagAddress;
        this.date = date;
    }
}
