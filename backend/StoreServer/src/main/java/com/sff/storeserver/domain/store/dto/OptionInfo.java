package com.sff.storeserver.domain.store.dto;

import com.sff.storeserver.domain.store.entity.Options;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OptionInfo {
    @NotBlank(message = "옵션 이름이 공백입니다.")
    private String name;
    @NotBlank(message = "옵션 가격이 공백입니다.")
    private int price;

    public Options toEntity() {
        return Options.builder()
                .name(name)
                .price(price)
                .build();
    }

}
