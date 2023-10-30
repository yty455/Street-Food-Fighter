package com.sff.storeserver.domain.review.repository;

import com.sff.storeserver.domain.flag.entity.Flag;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Flag, Long> {
}
