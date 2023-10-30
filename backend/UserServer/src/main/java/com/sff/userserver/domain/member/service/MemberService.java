package com.sff.userserver.domain.member.service;

import com.sff.userserver.domain.member.dto.MemberSignupRequest;

public interface MemberService {
    void signUp(MemberSignupRequest memberSignupRequest);

    void deleteMember(Long memberId);
}
