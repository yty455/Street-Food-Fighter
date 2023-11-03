package com.sff.storeserver.domain.flag.repository;

import com.sff.storeserver.domain.flag.entity.Flag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface FlagRepository extends JpaRepository<Flag, Long> {

    List<Flag> findByStoreIdAndDate(Long storeId, LocalDate date);

    List<Flag> findByDate(LocalDate date);
}
