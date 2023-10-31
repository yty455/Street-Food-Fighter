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

    //    @Query(value = "SELECT * FROM store s WHERE ST_DISTANCE(ST_PointFromText(CONCAT('POINT(', s.lati, ' ', s.longi, ')')), ST_GeomFromText('POINT(:lati',' ',':longi)')) <= 1600", nativeQuery = true)
//    @Query(value = "SELECT * FROM store WHERE SQRT(POWER(lati - :lati, 2) + POWER(longi - longi, 2)) * 111.045 <= 1.6\n", nativeQuery = true)
    @Query(value = "SELECT * FROM store s WHERE ST_DISTANCE(ST_PointFromText(CONCAT('POINT(', CAST(s.lati AS CHAR), ' ', CAST(s.longi AS CHAR), ')')), ST_GeomFromText(CONCAT('POINT(', :lati, ' ', :longi, ')'))) <= 1600", nativeQuery = true)
    List<Store> findNearStore(@Param("lati") double lati, @Param("longi") double longi);

    @Query(value = "SELECT * FROM store join Flag f on f.store = store WHERE ST_DISTANCE(location, ST_GeomFromText(:point, 4326)) <= 1600 and f.date = :date", nativeQuery = true)
    List<Store> findNearFlag(@Param("point") Point point, @Param("date") Date date);

}
