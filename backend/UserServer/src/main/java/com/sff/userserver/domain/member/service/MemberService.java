package com.sff.userserver.domain.member.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.sff.userserver.domain.member.dto.*;
import com.sff.userserver.domain.member.entity.Member;

import java.util.List;

public interface MemberService {
    void signUp(SignupRequest signupRequest);

    void deleteMember(Long memberId);

    MemberInfoResponse getMember(Long memberId);

    Member findMember(Long memberId);

    List<MemberInfoResponse> getMembers(List<Long> memberIds);

    void updateGrade(String gradeUpdateRequestList) throws JsonProcessingException;

    List<MemberFcmTokenResponse> getFcmTokens(List<Long> memberIds);
}
