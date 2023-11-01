package com.sff.OrderServer.bucket.repository;

import com.sff.OrderServer.bucket.entity.Bucket;
import com.sff.OrderServer.bucket.entity.OrderMenu;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderMenuRepository extends JpaRepository<OrderMenu, Long> {

    List<OrderMenu> findAllByBucket_BucketId(Long bucketId);
    List<OrderMenu> findAllByBucket(Bucket bucket);
    
}

