package com.sff.storeserver.domain.review.repository;

import com.sff.storeserver.domain.review.dto.MyReviewInfo;
import com.sff.storeserver.domain.review.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    @Query("select new com.sff.storeserver.domain.review.dto.MyReviewInfo(s.id, s.name, r.createdDate, r.score, r.content, r.orderId) from Review r join r.store s where r.userId = :userId")
    List<MyReviewInfo> findByUserId(@Param("userId") Long userId);

}
