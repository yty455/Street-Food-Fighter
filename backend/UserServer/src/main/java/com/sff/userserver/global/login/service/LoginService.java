package com.sff.userserver.global.login.service;

import com.sff.userserver.domain.Member.entity.Member;
import com.sff.userserver.domain.Member.repository.MemberRepository;
import com.sff.userserver.global.error.type.BaseException;
import com.sff.userserver.global.utils.ApiError;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LoginService implements UserDetailsService {
    private final MemberRepository memberRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new BaseException(new ApiError("일치하는 회원이 없습니다.", 200)));

        return User.builder()
                .username(String.valueOf(member.getId()))
                .password(member.getPassword())
                .roles(member.getRole().name())
                .build();
    }
}
