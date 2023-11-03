package com.sff.storeserver.domain.store.repository;

import com.sff.storeserver.domain.store.entity.Store;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface StoreRepository extends JpaRepository<Store, Long> {
    Optional<Store> findByOwnerId(Long ownerId);

    @Query(value = "SELECT * FROM store s WHERE ST_DISTANCE(ST_PointFromText(CONCAT('POINT(', CAST(s.lati AS CHAR), ' ', CAST(s.longi AS CHAR), ')')), ST_GeomFromText(CONCAT('POINT(', :lati, ' ', :longi, ')'))) <= 1500 and s.state = 'OPEN'", nativeQuery = true)
    List<Store> findNearStore(@Param("lati") double lati, @Param("longi") double longi);

    @Query(value = "SELECT s.* FROM flag f join store s on f.store_id = s.store_id WHERE ST_DISTANCE(ST_PointFromText(CONCAT('POINT(', CAST(f.lati AS CHAR), ' ', CAST(f.longi AS CHAR), ')')), ST_GeomFromText(CONCAT('POINT(', :lati, ' ', :longi, ')'))) <= 1500 and f.date = :date and f.state = 'WAITING' ", nativeQuery = true)
    List<Store> findNearFlag(@Param("lati") double lati, @Param("longi") double longi, @Param("date") LocalDate date);

}
