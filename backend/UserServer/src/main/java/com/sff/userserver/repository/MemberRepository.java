package com.sff.userserver.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sff.userserver.domain.Member;

public interface MemberRepository extends JpaRepository<Member, Long> {
	Optional<Member> findByEmail(String email);
}
