package com.sff.OrderServer.order.repository;

import com.sff.OrderServer.bucket.entity.Bucket;
import com.sff.OrderServer.order.entity.OrderRecord;
import com.sff.OrderServer.order.entity.OrderState;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface OrderRecordRepository extends JpaRepository<OrderRecord, Long> {

    @Query("SELECT COUNT(o) FROM OrderRecord o WHERE o.storeId = :storeId "
            + "AND FUNCTION('YEAR', o.createdAt) = FUNCTION('YEAR', :date) " +
            "AND FUNCTION('MONTH', o.createdAt) = FUNCTION('MONTH', :date) " +
            "AND FUNCTION('DAY', o.createdAt) = FUNCTION('DAY', :date) ")
    Integer countOrdersByStoreId(@Param("storeId") Long storeId, @Param("date") LocalDateTime date);

    List<OrderRecord> findAllByUserIdOrderByCreatedAtDesc(Long userId);

    @Query("SELECT o FROM OrderRecord o WHERE o.storeId = :storeId AND o.orderState = :orderState AND o.createdAt >= :currentDate ORDER BY o.createdAt DESC")
    List<OrderRecord> findCurrentOrders(@Param("storeId") Long storeId,
            @Param("orderState") OrderState orderState, @Param("currentDate") LocalDateTime currentDate);

    @Query("SELECT o FROM OrderRecord o WHERE o.storeId = :storeId AND o.orderState = :orderState " +
            "AND FUNCTION('YEAR', o.createdAt) = FUNCTION('YEAR', :date) " +
            "AND FUNCTION('MONTH', o.createdAt) = FUNCTION('MONTH', :date) " +
            "AND FUNCTION('DAY', o.createdAt) = FUNCTION('DAY', :date) " +
            "ORDER BY o.createdAt DESC")
    List<OrderRecord> findCurrentOrdersByDate(@Param("storeId") Long storeId,
            @Param("orderState") OrderState orderState, @Param("date") LocalDateTime date);

    List<OrderRecord> findAllByStoreIdOrderByCreatedAtDesc(Long storeId);

    // 사용자(User)당 이전달 주문 횟수를 조회하는 메소드
//    @Query("SELECT o.userId, COUNT(o) FROM OrderRecord o GROUP BY o.userId")
//    List<Object[]> countOrdersByUserId();

    @Query("SELECT o.userId, COUNT(o) FROM OrderRecord o WHERE MONTH(o.createdAt) = :previousMonth GROUP BY o.userId")
    List<Object[]> countOrdersByUserId(@Param("previousMonth") int previousMonth);


    Optional<OrderRecord> findByBucket(Bucket bucket);
}
