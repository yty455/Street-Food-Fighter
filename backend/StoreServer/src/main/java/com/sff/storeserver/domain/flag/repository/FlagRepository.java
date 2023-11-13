package com.sff.storeserver.domain.flag.repository;

import com.sff.storeserver.domain.flag.dto.FlagMSAResponse;
import com.sff.storeserver.domain.flag.entity.Flag;
import com.sff.storeserver.domain.flag.entity.FlagType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface FlagRepository extends JpaRepository<Flag, Long> {

    @Query("select new com.sff.storeserver.domain.flag.dto.FlagMSAResponse(s.name, s.category, f.address, f.date) from Flag f join f.store s where f.id = :flagId")
    FlagMSAResponse getFlagById(@Param("flagId") Long flagId);

    List<Flag> findByStoreIdAndDate(Long storeId, LocalDate date);

    List<Flag> findByDateAndState(LocalDate date, FlagType state);

    @Query(value = "SELECT f.* FROM flag f join store s on f.store_id = s.store_id WHERE ST_DISTANCE(ST_PointFromText(CONCAT('POINT(', CAST(f.lati AS CHAR), ' ', CAST(f.longi AS CHAR), ')')), ST_GeomFromText(CONCAT('POINT(', :lati, ' ', :longi, ')'))) <= 1500 and f.date = :date and f.state = 'WAITING' ", nativeQuery = true)
    List<Flag> findNearFlag(@Param("lati") double lati, @Param("longi") double longi, @Param("date") LocalDate date);
}
