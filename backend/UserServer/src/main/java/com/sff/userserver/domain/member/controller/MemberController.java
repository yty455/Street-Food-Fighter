package com.sff.userserver.domain.member.controller;

import com.sff.userserver.domain.member.dto.MemberSignupRequest;
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
    public ApiResult<?> signUp(@Valid @RequestBody MemberSignupRequest memberSignupRequest) {
        memberService.signUp(memberSignupRequest);
        return ApiUtils.success("회원 가입 성공");
    }

    @DeleteMapping("/{memberId}")
    public ApiResult<?> deleteMember(@PathVariable Long memberId) {
        memberService.deleteMember(memberId);
        return ApiUtils.success("회원 가입 성공");
    }


    @GetMapping("jwt-test")
    public String jwtTest() {
        return "jwtTest 요청 성공";
    }
}
