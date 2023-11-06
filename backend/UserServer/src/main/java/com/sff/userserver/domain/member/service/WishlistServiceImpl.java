package com.sff.userserver.domain.member.service;

import com.sff.userserver.domain.member.dto.WishlistResponse;
import com.sff.userserver.domain.member.entity.FoodType;
import com.sff.userserver.domain.member.entity.Wishlist;
import com.sff.userserver.domain.member.repository.WishlistRepository;
import com.sff.userserver.global.error.type.BaseException;
import com.sff.userserver.global.utils.ApiError;
import lombok.Builder;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@Builder
@RequiredArgsConstructor
public class WishlistServiceImpl implements WishlistService {
    private final WishlistRepository wishlistRepository;
    private final MemberService memberService;

    @Override
    @Transactional
    public void createWishlist(Long memberId, FoodType foodType) {
        if (wishlistRepository.existsByMember_idAndFoodType(memberId, foodType)) {
            throw new BaseException(new ApiError("추가 요청한 음식 타입이 이미 있습니다.", 1131));
        }
        Wishlist wishlist = Wishlist.create(foodType, memberService.findMember(memberId));
        wishlistRepository.save(wishlist);
    }

    @Override
    public List<WishlistResponse> getWishlist(Long memberId) {
        List<Wishlist> wishlists = wishlistRepository.findByMember_Id(memberId);
        return wishlists.stream()
                .map(wishlist -> WishlistResponse.builder()
                        .foodType(wishlist.getFoodType())
                        .build())
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void deleteWishlist(Long memberId, FoodType foodType) {
        Wishlist wishlist = wishlistRepository.findByMember_IdAndFoodType(memberId, foodType)
                .orElseThrow(() -> new BaseException(new ApiError("삭제 요청한 음식 타입이 없습니다.", 1132)));
        wishlistRepository.delete(wishlist);
    }
}
