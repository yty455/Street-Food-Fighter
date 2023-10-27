package com.sff.userserver.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.sff.userserver.domain.Member;
import com.sff.userserver.repository.MemberRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RegisterMemberService {
	private final PasswordEncoder passwordEncoder;
	private final MemberRepository repository;

	public Long join(String email, String pw) {
		Member member = Member.createUser(email, pw, passwordEncoder);
		validateDuplicateMember(member);
		repository.save(member);

		return member.getId();
	}

	private void validateDuplicateMember(Member member) {
		repository.findByEmail(member.getEmail())
				.ifPresent(m -> {
					throw new IllegalStateException("이미 존재하는 회원입니다.");
				});
	}
}
