package com.sff.storeserver.domain.store.repository;

import com.sff.storeserver.domain.store.Menu;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MenuRepository extends JpaRepository<Menu, Long> {
}
