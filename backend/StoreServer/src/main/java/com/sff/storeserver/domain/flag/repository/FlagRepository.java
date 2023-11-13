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

    @Query("select f from Flag f where f.addressRegion.region1 = :region1 and f.addressRegion.region2 = :region2 and f.addressRegion.region3 = :region3 and f.addressRegion.region4 = :region4 and f.date = :date and f.state = 'WAITING'")
    List<Flag> findNearFlag(@Param("region1") String region1, @Param("region2") String region2, @Param("region3") String region3, @Param("region4") String region4, @Param("date") LocalDate date);
}
