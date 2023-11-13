package com.sff.storeserver.domain.flag.dto;

import com.sff.storeserver.domain.store.entity.CategoryType;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@Builder
@NoArgsConstructor
public class FlagMSAResponse {

    private String storeName;
    private CategoryType categoryType;
    private String flagAddress;
    private LocalDate date;

    public FlagMSAResponse(String storeName, CategoryType categoryType, String flagAddress, LocalDate date) {
        this.storeName = storeName;
        this.categoryType = categoryType;
        this.flagAddress = flagAddress;
        this.date = date;
    }
}
