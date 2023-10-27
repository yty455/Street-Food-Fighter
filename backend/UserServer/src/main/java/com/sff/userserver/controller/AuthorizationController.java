package com.sff.userserver.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sff.userserver.dto.MemberJoinDto;
import com.sff.userserver.service.RegisterMemberService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthorizationController {
	private final RegisterMemberService registerMemberService;

	@PostMapping("/join")
	public ResponseEntity<String> join(@RequestBody MemberJoinDto dto) {
		try {
			registerMemberService.join(dto.getEmail(), dto.getPw());
			return ResponseEntity.ok("회원가입 성공");
		} catch (Exception e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}
}
