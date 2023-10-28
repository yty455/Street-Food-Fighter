package com.sff.userserver.domain.Member.repository;

import com.sff.userserver.domain.Member.entity.Member;
import com.sff.userserver.domain.Member.entity.SocialType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByEmail(String email);

    Optional<Member> findBySocialTypeAndSocialId(SocialType socialType, String socialId);

    Optional<Member> findByRefreshToken(String refreshToken);
}
