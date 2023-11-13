package com.sff.OrderServer.order.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class StoreStatsResponse {

    private List<MenuStatsResponse> menuStatsList;
    private Integer totalPrice;

}
