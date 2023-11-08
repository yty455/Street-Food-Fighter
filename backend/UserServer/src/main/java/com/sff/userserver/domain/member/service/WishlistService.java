package com.sff.userserver.domain.member.service;

import com.sff.userserver.domain.member.dto.WishlistResponse;
import com.sff.userserver.domain.member.dto.WishlistStatsResponse;
import com.sff.userserver.domain.member.entity.FoodType;

import java.util.List;

public interface WishlistService {
    void createWishlist(Long memberId, FoodType foodType);

    List<WishlistResponse> getWishlist(Long memberId);

    void deleteWishlist(Long memberId, FoodType foodType);

    List<WishlistStatsResponse> getWishlistStats(String region1, String region2, String region3, String region4);
}