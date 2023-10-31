package com.sff.userserver.domain.member.controller;

import com.sff.userserver.domain.member.dto.MemberInfoResponse;
import com.sff.userserver.domain.member.dto.MyInfoRequest;
import com.sff.userserver.domain.member.dto.SignupRequest;
import com.sff.userserver.domain.member.service.MemberServiceImpl;
import com.sff.userserver.global.utils.ApiResult;
import com.sff.userserver.global.utils.ApiUtils;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

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

    @DeleteMapping("/{memberId}")
    public ApiResult<?> deleteMember(@PathVariable Long memberId) {
        memberService.deleteMember(memberId);
        return ApiUtils.success("회원 탈퇴 완료");
    }

    @GetMapping("/me")
    public ApiResult<?> getMember() {
        MemberInfoResponse member = memberService.getMember(1L); // TODO: 실제 인증된 회원의 ID 넣기
        return ApiUtils.success(member);
    }

    @PatchMapping("/me")
    public ApiResult<?> updateMember(@RequestBody MyInfoRequest myInfoRequest) {
        memberService.updateMember(1L, myInfoRequest); // TODO: 실제 인증된 회원의 ID 넣기
        return ApiUtils.success("내 정보 수정 성공");
    }

    @GetMapping("jwt-test")
    public String jwtTest() {
        return "jwtTest 요청 성공";
    }
}
