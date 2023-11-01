package com.sff.OrderServer.funding.repository;

import com.sff.OrderServer.funding.entity.Funding;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FundingRepository extends JpaRepository<Funding, Long> {

}
