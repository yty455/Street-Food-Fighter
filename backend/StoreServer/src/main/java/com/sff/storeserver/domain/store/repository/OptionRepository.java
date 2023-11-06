package com.sff.storeserver.domain.store.repository;

import com.sff.storeserver.domain.store.entity.Options;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OptionRepository extends JpaRepository<Options, Long> {
}
