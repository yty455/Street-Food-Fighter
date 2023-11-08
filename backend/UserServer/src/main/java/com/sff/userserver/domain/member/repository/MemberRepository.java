package com.sff.userserver.domain.member.repository;

import com.sff.userserver.domain.member.entity.Member;
import com.sff.userserver.domain.member.entity.SocialType;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByEmail(String email);

    Optional<Member> findBySocialTypeAndSocialId(SocialType socialType, String socialId);

    Optional<Member> findByRefreshToken(String refreshToken);

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("select m from Member m join fetch m.point where m.id = :memberId")
    Optional<Member> findByIdWithPoint(@Param("memberId") Long memberId);
}
