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
}
