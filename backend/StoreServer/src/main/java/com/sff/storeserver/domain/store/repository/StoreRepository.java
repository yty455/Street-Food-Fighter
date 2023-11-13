package com.sff.storeserver.domain.store.repository;

import com.sff.storeserver.domain.store.entity.Store;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface StoreRepository extends JpaRepository<Store, Long> {
    Optional<Store> findByOwnerId(Long ownerId);

    @Query(value = "select s from Store s where s.address.region1 = :region1 and s.address.region2 = :region2 and s.address.region3 = :region3 and s.address.region4 = :region4 and s.state = 'OPEN'")
    List<Store> findNearStore(@Param("region1") String region1, @Param("region2") String region2, @Param("region3") String region3, @Param("region4") String region4);

    List<Store> findAllByIdIn(List<Long> storeList);
}
