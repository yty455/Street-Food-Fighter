package com.sff.OrderServer.funding.dto;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class StoreFlag {
    private Long storeId;
    private String storeName;
    private String storeUrl;
    private String flagAddress;
    private LocalDateTime flagDate;
}
