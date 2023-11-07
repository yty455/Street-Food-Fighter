package com.sff.userserver.domain.member.dto;

import com.sff.userserver.domain.member.entity.FoodType;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class WishlistRequest {
    private FoodType foodType;
}
