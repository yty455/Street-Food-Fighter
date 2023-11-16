package com.sff.storeserver.domain.review.repository;

import com.sff.storeserver.domain.review.dto.MyReviewResponse;
import com.sff.storeserver.domain.review.dto.StoreReviewResponse;
import com.sff.storeserver.domain.review.entity.Review;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    @Query("select new com.sff.storeserver.domain.review.dto.MyReviewResponse(s.id, s.name, s.category, r.createdDate, r.score, r.content, r.orderId) from Review r join r.store s where r.userId = :userId")
    Page<MyReviewResponse> findByUserId(@Param("userId") Long userId, Pageable pageable);

    @Query("select new com.sff.storeserver.domain.review.dto.StoreReviewResponse(r.createdDate, r.score, r.content, r.userId) from Review r where r.store.id = :storeId")
    Slice<StoreReviewResponse> findByStoreId(@Param("storeId") Long storeId, Pageable pageable);

    @Query("select AVG(r.score) from Review r where r.store.id = :storeId")
    Double getAverageScoreByStoreId(@Param("storeId") Long storeId);

    Optional<Review> findByOrderId(Long orderId);
}
