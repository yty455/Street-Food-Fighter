package com.sff.userserver.domain.member.controller;

import com.sff.userserver.domain.member.dto.WishlistRequest;
import com.sff.userserver.domain.member.dto.WishlistResponse;
import com.sff.userserver.domain.member.dto.WishlistStatsResponse;
import com.sff.userserver.domain.member.service.WishlistServiceImpl;
import com.sff.userserver.global.utils.ApiResult;
import com.sff.userserver.global.utils.ApiUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user-server")
public class WishlistController {
    private final WishlistServiceImpl wishlistService;

    @PostMapping("/wishlist/add")
    public ApiResult<?> createWishlist(@RequestBody WishlistRequest wishlistRequest) {
        wishlistService.createWishlist(1L, wishlistRequest.getFoodType()); // TODO: 실제 인증된 회원의 ID 넣기
        return ApiUtils.success("카테고리 추가 성공");
    }

    @GetMapping("/wishlist")
    public ApiResult<?> getWishlist() {
        List<WishlistResponse> wishlist = wishlistService.getWishlist(1L); // TODO: 실제 인증된 회원의 ID 넣기
        return ApiUtils.success(wishlist);
    }

    @PostMapping("/wishlist/remove")
    public ApiResult<?> deleteWishlist(@RequestBody WishlistRequest wishlistRequest) {
        wishlistService.deleteWishlist(1L, wishlistRequest.getFoodType()); // TODO: 실제 인증된 회원의 ID 넣기
        return ApiUtils.success("카테고리 삭제 성공");
    }

    @GetMapping("/stats")
    public ApiResult<?> getWishlistStats(
            @RequestParam(name = "region1") String region1,
            @RequestParam(name = "region2") String region2,
            @RequestParam(name = "region3") String region3,
            @RequestParam(name = "region4", required = false, defaultValue = "") String region4) {
        List<WishlistStatsResponse> wishlistStats = wishlistService.getWishlistStats(region1, region2, region3, region4);
        return ApiUtils.success(wishlistStats);
    }
}
