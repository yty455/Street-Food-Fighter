package com.sff.OrderServer.order.repository;

import com.sff.OrderServer.order.entity.OrderRecord;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface OrderRepository extends JpaRepository<OrderRecord, Long> {

    @Query("SELECT COUNT(o) FROM OrderRecord o WHERE o.storeId = :storeId")
    Integer countOrdersByStoreId(@Param("storeId") Long storeId);

    List<OrderRecord> findAllByUserIdOrderByOrderDate(Long userId);
}
