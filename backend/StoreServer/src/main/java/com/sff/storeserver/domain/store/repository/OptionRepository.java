package com.sff.storeserver.domain.store.repository;

import com.sff.storeserver.domain.store.entity.Option;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OptionRepository extends JpaRepository<Option, Long> {
}
