package com.sff.OrderServer.bucket.repository;

import com.sff.OrderServer.bucket.entity.Bucket;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BucketRepository extends JpaRepository<Bucket, Long> {
    Optional<Bucket> findByUserIdAndPaymentStateFalse(Long userId);
    Optional<Bucket> findByBucketIdAndUserId(Long bucketId, Long userId);
}
