package com.sff.userserver.config;

import java.util.Optional;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import com.sff.userserver.domain.Member;
import com.sff.userserver.service.MemberService;

@Component
public class MyUserDetailsService implements UserDetailsService {
	private final MemberService memberService;

	public MyUserDetailsService(MemberService memberService) {
		this.memberService = memberService;
	}

	@Override
	public UserDetails loadUserByUsername(String insertedUserId) throws UsernameNotFoundException {
		Member member = memberService.findOne(insertedUserId)
				.orElseThrow(() -> new UsernameNotFoundException("없는 회원입니다."));

		return User.builder()
				.username(member.getEmail())
				.password(member.getPw())
				.roles(member.getRole())
				.build();
	}
}
