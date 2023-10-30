package com.sff.storeserver.domain.flag.repository;

import com.sff.storeserver.domain.flag.entity.Flag;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FlagRepository extends JpaRepository<Flag, Long> {
}
