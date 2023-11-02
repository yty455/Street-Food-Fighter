package com.sff.OrderServer.order.repository;

import com.sff.OrderServer.order.entity.OrderRecord;
import com.sff.OrderServer.order.entity.OrderState;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface OrderRecordRepository extends JpaRepository<OrderRecord, Long> {

    @Query("SELECT COUNT(o) FROM OrderRecord o WHERE o.storeId = :storeId "
            + "AND FUNCTION('YEAR', o.orderDate) = FUNCTION('YEAR', :date) " +
            "AND FUNCTION('MONTH', o.orderDate) = FUNCTION('MONTH', :date) " +
            "AND FUNCTION('DAY', o.orderDate) = FUNCTION('DAY', :date) ")
    Integer countOrdersByStoreId(@Param("storeId") Long storeId, @Param("date") LocalDateTime date);

    List<OrderRecord> findAllByUserIdOrderByOrderDateDesc(Long userId);

    List<OrderRecord> findByStoreIdAndStateOrderByOrderDateDesc(Long storeId, OrderState state);

    @Query("SELECT o FROM OrderRecord o WHERE o.storeId = :storeId AND o.state = :state AND o.orderDate >= :currentDate ORDER BY o.orderDate DESC")
    List<OrderRecord> findCurrentOrders(@Param("storeId") Long storeId,
            @Param("state") OrderState state, @Param("currentDate") LocalDateTime currentDate);

    @Query("SELECT o FROM OrderRecord o WHERE o.storeId = :storeId AND o.state = :state " +
            "AND FUNCTION('YEAR', o.orderDate) = FUNCTION('YEAR', :date) " +
            "AND FUNCTION('MONTH', o.orderDate) = FUNCTION('MONTH', :date) " +
            "AND FUNCTION('DAY', o.orderDate) = FUNCTION('DAY', :date) " +
            "ORDER BY o.orderDate DESC")
    List<OrderRecord> findCurrentOrdersByDate(@Param("storeId") Long storeId,
            @Param("state") OrderState state, @Param("date") LocalDateTime date);
}
