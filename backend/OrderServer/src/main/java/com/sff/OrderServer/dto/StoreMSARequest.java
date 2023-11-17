package com.sff.OrderServer.dto;

import java.util.List;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class StoreMSARequest {

    List<Long> storeIds;

    public StoreMSARequest(List<Long> storeIds) {
        this.storeIds = storeIds;
    }
}
