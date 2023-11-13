package com.sff.userserver.domain.member.dto;

import com.sff.userserver.domain.member.entity.FoodType;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class WishlistResponse {
    private FoodType foodType;

    @Builder
    public WishlistResponse(FoodType foodType) {
        this.foodType = foodType;
    }
}
