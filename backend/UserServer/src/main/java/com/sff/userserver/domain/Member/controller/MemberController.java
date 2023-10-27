package com.sff.userserver.domain.Member.controller;

import com.sff.userserver.domain.Member.dto.MemberSignupRequest;
import com.sff.userserver.domain.Member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class MemberController {
    private final MemberService memberService;

    @PostMapping("/sign-up")
    public String signUp(@RequestBody MemberSignupRequest memberSignupRequest) {
        memberService.signUp(memberSignupRequest);
        return "회원가입 성공";
    }

    @GetMapping("jwt-test")
    public String jwtTest() {
        return "jwtTest 요청 성공";
    }
}
