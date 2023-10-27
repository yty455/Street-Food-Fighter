package com.sff.storeserver.domain.store.repository;

import com.sff.storeserver.domain.store.Store;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StoreRepository extends JpaRepository<Store, Long> {
    Store findByOwnerId(Long ownerId);
}
