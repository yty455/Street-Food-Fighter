package com.sff.userserver.domain.Member.repository;

import java.util.Optional;

import com.sff.userserver.domain.Member.entity.SocialType;
import org.springframework.data.jpa.repository.JpaRepository;

import com.sff.userserver.domain.Member.entity.Member;

public interface MemberRepository extends JpaRepository<Member, Long> {
	Optional<Member> findByEmail(String email);

    Optional<Member> findBySocialTypeAndSocialId(SocialType socialType, String socialId);
}
