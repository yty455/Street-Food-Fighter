package com.sff.storeserver.domain.store.dto;

import com.sff.storeserver.domain.store.entity.CategoryType;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StoreUpdateCategory {
    @NotBlank(message = "카테고리가 공백입니다.")
    private CategoryType category;
    @NotBlank(message = "업태가 공백입니다.")
    private String businessCategory;
}
