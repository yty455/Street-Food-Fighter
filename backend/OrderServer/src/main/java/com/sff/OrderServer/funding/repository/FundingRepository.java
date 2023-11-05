package com.sff.OrderServer.funding.repository;

import com.sff.OrderServer.bucket.entity.Bucket;
import com.sff.OrderServer.funding.dto.FundingResponse;
import com.sff.OrderServer.funding.entity.Funding;
import com.sff.OrderServer.funding.entity.FundingState;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface FundingRepository extends JpaRepository<Funding, Long> {
    List<Funding> findAllByUserId(Long userId);
    Optional<Funding> findByFundingIdAndUserId(Long fundingId, Long userId);

    @Query("SELECT SUM(b.totalPrice) FROM Funding f JOIN f.bucket b WHERE f.flagId = :flagId AND f.fundingState = 'WAITING'")
    Integer sumBucketTotalPriceByFlagIdAndWaitingState(@Param("flagId") Long flagId);

    @Query("SELECT f.flagId, COALESCE(SUM(b.totalPrice), 0) FROM Funding f JOIN f.bucket b WHERE f.flagId IN :flagIds AND f.fundingState = 'WAITING' GROUP BY f.flagId")
    List<Object[]> sumBucketTotalPriceByFlagIdsAndWaitingState(@Param("flagIds") List<Long> flagIds);

    @Query("SELECT DISTINCT f.userId FROM Funding f WHERE f.flagId = :flagId")
    List<Long> findUserIdsByFlagId(@Param("flagId") Long flagId);
}
