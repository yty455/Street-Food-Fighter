package com.sff.OrderServer.bucket.repository;

import com.sff.OrderServer.bucket.entity.OrderMenu;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.sff.OrderServer.bucket.entity.Bucket;
import java.util.Optional;
import org.springframework.stereotype.Repository;

public interface OrderMenuRepository extends JpaRepository<OrderMenu, Long> {

    List<OrderMenu> findAllByBucketId(Long bucketId);
    List<OrderMenu> findAllByBucket(Bucket bucket);
    
}

