package com.sff.userserver.domain.member.service;

import com.sff.userserver.domain.member.dto.MemberInfoResponse;
import com.sff.userserver.domain.member.dto.MemberSignupRequest;
import com.sff.userserver.domain.member.entity.Member;
import com.sff.userserver.domain.member.repository.MemberRepository;
import com.sff.userserver.global.error.type.BaseException;
import com.sff.userserver.global.utils.ApiError;
import lombok.Builder;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@Builder
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public void signUp(MemberSignupRequest memberSignupRequest) {
        validateDuplicateMember(memberSignupRequest);
        Member member = memberSignupRequest.toEntity();
        member.passwordEncode(passwordEncoder);
        memberRepository.save(member);
    }

    private void validateDuplicateMember(MemberSignupRequest memberSignupRequest) {
        memberRepository.findByEmail(memberSignupRequest.getEmail())
                .ifPresent(m -> {
                    throw new BaseException(new ApiError("이미 존재하는 계정입니다.", 1111));
                });
    }

    @Override
    @Transactional
    public void deleteMember(Long memberId) {
        if (memberRepository.existsById(memberId)) {
            memberRepository.deleteById(memberId);
        } else {
            throw new BaseException(new ApiError("존재하지 않는 사용자입니다.", 1101));
        }
    }

    @Override
    public MemberInfoResponse getMember(Long memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new BaseException(new ApiError("존재하지 않는 사용자입니다", 1101)));
        return MemberInfoResponse.builder().member(member).build();

    }
}
