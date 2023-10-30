package com.sff.storeserver.domain.store.repository;

import com.sff.storeserver.domain.store.entity.Store;
import org.springframework.data.geo.Point;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

public interface StoreRepository extends JpaRepository<Store, Long> {
    Store findByOwnerId(Long ownerId);

    @Query(value = "SELECT * FROM store WHERE ST_DISTANCE(location, ST_GeomFromText(:point, 4326)) <= 1600", nativeQuery = true)
    List<Store> findNearStore(@Param("point") Point point);

    @Query(value = "SELECT * FROM store join Flag f on f.store = store WHERE ST_DISTANCE(location, ST_GeomFromText(:point, 4326)) <= 1600 and f.date = :date", nativeQuery = true)
    List<Store> findNearFlag(@Param("point") Point point, @Param("date")Date date);


}
