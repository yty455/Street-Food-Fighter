package com.sff.userserver.domain;

import org.springframework.security.crypto.password.PasswordEncoder;

import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@AllArgsConstructor
public class Member {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "MEMBER_ID")
	private Long id;

	private String email;
	private String password;
	private String nickname;
	private String phone;
	private String imageUrl;
	@Enumerated(EnumType.STRING)
	private Grade grade;
	@Enumerated(EnumType.STRING)
	private Role role;
	private Integer socialId;
	@Embedded
	private Address address;

	private Member(String email, String password, Role role) {
		this.email = email;
		this.password = password;
		this.role = role;
	}

	public static Member createUser(String email, String pw, PasswordEncoder passwordEncoder) {
		return new Member(email, passwordEncoder.encode(pw), Role.GUEST);
	}
}
