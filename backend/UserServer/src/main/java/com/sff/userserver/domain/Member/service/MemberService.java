package com.sff.userserver.domain.Member.service;

import com.sff.userserver.domain.Member.dto.MemberSignupRequest;
import com.sff.userserver.domain.Member.entity.Member;
import com.sff.userserver.domain.Member.repository.MemberRepository;
import com.sff.userserver.global.error.type.BaseException;
import com.sff.userserver.global.utils.ApiError;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    public void signUp(MemberSignupRequest memberSignupRequest) {
        validateDuplicateMember(memberSignupRequest);
        Member member = memberSignupRequest.toEntity();
        member.passwordEncode(passwordEncoder);
        memberRepository.save(member);
    }

    private void validateDuplicateMember(MemberSignupRequest memberSignupRequest) {
        memberRepository.findByEmail(memberSignupRequest.getEmail())
                .ifPresent(m -> {
                    throw new BaseException(new ApiError("이미 존재하는 이메일입니다.", 100));
                });
    }
}
