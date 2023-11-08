package com.sff.userserver.domain.member.repository;

import com.sff.userserver.domain.member.dto.WishlistStatsResponse;
import com.sff.userserver.domain.member.entity.FoodType;
import com.sff.userserver.domain.member.entity.Wishlist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface WishlistRepository extends JpaRepository<Wishlist, Long> {
    List<Wishlist> findByMember_Id(Long memberId);

    Optional<Wishlist> findByMember_IdAndFoodType(Long memberId, FoodType foodType);

    boolean existsByMember_idAndFoodType(Long memberId, FoodType foodType);

    @Query("select new com.sff.userserver.domain.member.dto.WishlistStatsResponse(w.foodType, count(w)) from Wishlist w where w.member.address.region1 = :region1 " +
            "and w.member.address.region2 = :region2 and w.member.address.region3 = :region3 and w.member.address.region4 = :region4 group by w.foodType")
    List<WishlistStatsResponse> findByMember_Address(@Param("region1") String region1, @Param("region2") String region2, @Param("region3") String region3, @Param("region4") String region4);

    @Query("select new com.sff.userserver.domain.member.dto.WishlistStatsResponse(w.foodType, count(w)) from Wishlist w where w.member.address.region1 = :region1 " +
            "and w.member.address.region2 = :region2 and w.member.address.region3 = :region3 group by w.foodType")
    List<WishlistStatsResponse> findByMember_AddressWithoutRegion4(@Param("region1") String region1, @Param("region2") String region2, @Param("region3") String region3);
}
