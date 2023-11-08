package com.sff.ownerserver.domain.owner.repository;

import com.sff.ownerserver.domain.owner.entity.Owner;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OwnerRepository extends JpaRepository<Owner, Long> {
    Optional<Owner> findByEmail(String email);

    Optional<Owner> findByRefreshToken(String refreshToken);

}
