package com.sff.userserver.dto;

import lombok.Getter;

@Getter
public class MemberJoinDto {

	private String email;
	private String pw;

	public void changePw(String pw) {
		this.pw = pw;
	}
}
