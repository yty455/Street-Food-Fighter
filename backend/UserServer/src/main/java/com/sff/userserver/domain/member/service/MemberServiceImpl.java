package com.sff.userserver.domain.member.service;

import com.sff.userserver.domain.member.dto.MemberInfoResponse;
import com.sff.userserver.domain.member.dto.MyInfoRequest;
import com.sff.userserver.domain.member.dto.SignupRequest;
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
    public void signUp(SignupRequest signupRequest) {
        validateDuplicateMember(signupRequest);
        Member member = signupRequest.toEntity();
        member.passwordEncode(passwordEncoder);
        // TODO: 포인트 생성하기(결제 비밀번호, 금액)
        memberRepository.save(member);
    }

    private void validateDuplicateMember(SignupRequest signupRequest) {
        memberRepository.findByEmail(signupRequest.getEmail())
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
        return MemberInfoResponse.builder().member(findMember(memberId)).build();

    }

    private Member findMember(Long memberId) {
        return memberRepository.findById(memberId)
                .orElseThrow(() -> new BaseException(new ApiError("존재하지 않는 사용자입니다", 1101)));
    }

    @Transactional
    public void updateMember(Long memberId, MyInfoRequest myInfoRequest) {
    }
}
