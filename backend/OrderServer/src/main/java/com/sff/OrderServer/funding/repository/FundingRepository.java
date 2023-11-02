package com.sff.OrderServer.funding.repository;

import com.sff.OrderServer.bucket.entity.Bucket;
import com.sff.OrderServer.funding.dto.FundingResponse;
import com.sff.OrderServer.funding.entity.Funding;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface FundingRepository extends JpaRepository<Funding, Long> {
    List<Funding> findAllByUserId(Long userId);
    Optional<Funding> findByFundingIdAndUserId(Long fundingId, Long userId);
    Optional<Funding> findByBucket(Bucket bucket);

}
