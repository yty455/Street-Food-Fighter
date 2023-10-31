package com.sff.storeserver.domain.store.dto;

import com.sff.storeserver.domain.store.entity.Menu;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MenuInfo {
    @NotBlank(message = "메뉴 이름이 공백입니다.")
    private String name;
    @NotBlank(message = "메뉴 가격이 공백입니다.")
    private int price;
    @NotBlank(message = "메뉴 이미지 URL 공백입니다.")
    private String menuUrl;
    @Valid
    private List<OptionInfo> optionInfoList;

    public Menu toEntity() {
        return Menu.builder()
                .name(name)
                .price(price)
                .menuUrl(menuUrl)
                .build();
    }
}
