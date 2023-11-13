package com.sff.userserver.domain.member.controller;

import com.sff.userserver.domain.common.annotation.UserIdRequired;
import com.sff.userserver.domain.common.aspect.UserIdHolder;
import com.sff.userserver.domain.member.dto.*;
import com.sff.userserver.domain.member.service.MemberServiceImpl;
import com.sff.userserver.global.utils.ApiResult;
import com.sff.userserver.global.utils.ApiUtils;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user-server")
public class MemberController {
    private final MemberServiceImpl memberService;

    @PostMapping("/sign-up")
    public ApiResult<?> signUp(@Valid @RequestBody SignupRequest signupRequest) {
        memberService.signUp(signupRequest);
        return ApiUtils.success("회원 가입 성공");
    }

    @DeleteMapping("/me")
    @UserIdRequired
    public ApiResult<?> deleteMember(UserIdHolder userIdHolder) {
        memberService.deleteMember(userIdHolder.getUserId());
        return ApiUtils.success("회원 탈퇴 완료");
    }

    @GetMapping("/me")
    @UserIdRequired
    public ApiResult<?> getMember(UserIdHolder userIdHolder) {
        MemberInfoResponse member = memberService.getMember(userIdHolder.getUserId());
        return ApiUtils.success(member);
    }

    @PatchMapping("/me")
    @UserIdRequired
    public ApiResult<?> updateMember(@Valid @RequestBody MyInfoRequest myInfoRequest, UserIdHolder userIdHolder) {
        memberService.updateMember(userIdHolder.getUserId(), myInfoRequest);
        return ApiUtils.success("내 정보 수정 성공");
    }

//    @PatchMapping("/members/grade")
//    public ApiResult<?> updateGrade(@RequestBody GradeUpdateRequestList gradeUpdateRequestList) {
//        memberService.updateGrade(gradeUpdateRequestList);
//        return ApiUtils.success("회원 등급 수정 완료");
//    }

    @PostMapping("/members")
    public ApiResult<?> getMembers(@RequestBody MembersInfoRequest membersInfoRequest) {
        List<MemberInfoResponse> members = memberService.getMembers(membersInfoRequest.getMemberIds());
        return ApiUtils.success(members);
    }

    @PostMapping("/members/tokens")
    public ApiResult<?> getFcmTokens(@RequestBody MembersInfoRequest membersInfoRequest) {
        List<MemberFcmTokenResponse> fcmTokens = memberService.getFcmTokens(membersInfoRequest.getMemberIds());
        return ApiUtils.success(fcmTokens);
    }

    @GetMapping("jwt-test")
    public String jwtTest() {
        return "jwtTest 요청 성공";
    }
}
