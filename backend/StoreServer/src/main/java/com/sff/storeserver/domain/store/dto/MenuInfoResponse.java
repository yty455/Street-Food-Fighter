package com.sff.storeserver.domain.store.dto;

import com.sff.storeserver.domain.store.entity.Menu;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MenuInfoResponse {
    private Long id;
    private String name;
    private Integer price;
    private String menuUrl;
    private List<OptionInfoResponse> optionInfoList;

    public static MenuInfoResponse fromEntity(Menu menu) {
        MenuInfoResponse menuInfoResponse = MenuInfoResponse.builder()
                .id(menu.getId())
                .name(menu.getName())
                .price(menu.getPrice())
                .menuUrl(menu.getMenuUrl())
                .build();
        if (menu.getOptions() != null) {
            menuInfoResponse.setOptionInfoList(menu.getOptions().stream()
                    .map(OptionInfoResponse::fromEntity)
                    .toList());
        }
        return menuInfoResponse;
    }

    public void setOptionInfoList(List<OptionInfoResponse> optionInfoList) {
        this.optionInfoList = optionInfoList;
    }
}
