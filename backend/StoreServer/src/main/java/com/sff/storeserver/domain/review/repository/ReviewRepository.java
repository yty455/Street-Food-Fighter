package com.sff.storeserver.domain.review.repository;

import com.sff.storeserver.domain.review.dto.MyReviewResponse;
import com.sff.storeserver.domain.review.dto.StoreReviewResponse;
import com.sff.storeserver.domain.review.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    @Query("select new com.sff.storeserver.domain.review.dto.MyReviewResponse(s.id, s.name, r.createdDate, r.score, r.content, r.orderId) from Review r join r.store s where r.userId = :userId")
    List<MyReviewResponse> findByUserId(@Param("userId") Long userId);

    @Query("select new com.sff.storeserver.domain.review.dto.StoreReviewResponse(r.createdDate, r.score, r.content, r.userId) from Review r where r.store.id = :storeId")
    List<StoreReviewResponse> findByStoreId(@Param("storeId") Long storeId);
}
