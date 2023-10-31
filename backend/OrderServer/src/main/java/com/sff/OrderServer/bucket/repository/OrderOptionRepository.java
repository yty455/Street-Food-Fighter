package com.sff.OrderServer.bucket.repository;

import com.sff.OrderServer.bucket.entity.OrderOption;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderOptionRepository extends JpaRepository<OrderOption, Long> {

    List<OrderOption> findAllByMenuId(Long orderMenuId);
}
