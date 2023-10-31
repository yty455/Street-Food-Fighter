package com.sff.storeserver.domain.review.repository;

import com.sff.storeserver.domain.review.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, Long> {
}
