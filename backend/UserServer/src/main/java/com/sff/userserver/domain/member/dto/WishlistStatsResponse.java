package com.sff.userserver.domain.member.dto;

import com.sff.userserver.domain.member.entity.FoodType;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class WishlistStatsResponse {
    private FoodType foodType;
    private long count;

    public WishlistStatsResponse(FoodType foodType, long count) {
        this.foodType = foodType;
        this.count = count;
    }
}
