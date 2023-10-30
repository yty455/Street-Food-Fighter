package com.sff.OrderServer.bucket.repository;

import com.sff.OrderServer.bucket.entity.OrderOption;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderOptionRepository extends JpaRepository<OrderOption, Long> {

}
