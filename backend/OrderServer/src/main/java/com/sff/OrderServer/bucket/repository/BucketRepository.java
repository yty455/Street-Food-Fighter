package com.sff.OrderServer.bucket.repository;

import com.sff.OrderServer.bucket.entity.Bucket;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BucketRepository extends JpaRepository<Bucket, Long> {

}
