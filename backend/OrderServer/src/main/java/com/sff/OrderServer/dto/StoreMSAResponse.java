package com.sff.OrderServer.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class StoreMSAResponse {

    private Long storeId;
    private String name;
    private String activeArea;
    private String storeUrl;

}
