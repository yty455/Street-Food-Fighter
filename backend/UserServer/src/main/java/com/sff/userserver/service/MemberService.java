package com.sff.userserver.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.sff.userserver.domain.Member;
import com.sff.userserver.repository.MemberRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MemberService {
	private final MemberRepository repository;

	public Optional<Member> findOne(String email) {
		return repository.findByEmail(email);
	}
}
