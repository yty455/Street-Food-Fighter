package com.sff.storeserver.domain.store.dto;

import com.sff.storeserver.domain.store.entity.CategoryType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StoreUpdateCategory {
    private CategoryType category;
    private String businessCategory;
}
