package com.sff.userserver.domain.member.repository;

import com.sff.userserver.domain.member.entity.FoodType;
import com.sff.userserver.domain.member.entity.Wishlist;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface WishlistRepository extends JpaRepository<Wishlist, Long> {
    List<Wishlist> findByMember_Id(Long memberId);

    Optional<Wishlist> findByMember_IdAndFoodType(Long memberId, FoodType foodType);

    boolean existsByMember_idAndFoodType(Long memberId, FoodType foodType);
}
