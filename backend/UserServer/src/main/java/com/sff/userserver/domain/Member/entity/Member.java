package com.sff.userserver.domain.Member.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
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
    @Enumerated(EnumType.STRING)
    private SocialType socialType; // KAKAO
    private String socialId;
    private String refreshToken;
    @Embedded
    private Address address;

    @Builder
    public Member(String email, String password, String nickname, String phone, String imageUrl, Role role, SocialType socialType, String socialId, String refreshToken, String region1, String region2, String region3, String region4, PasswordEncoder passwordEncoder) {
        this.email = email;
        this.password = passwordEncoder.encode(password);
        this.nickname = nickname;
        this.phone = phone;
        this.imageUrl = imageUrl;
        this.grade = Grade.LIGHT;
        this.role = role;
        this.socialType = socialType;
        this.socialId = socialId;
        this.refreshToken = refreshToken;
        this.address = new Address(region1, region2, region3, region4);
    }

    public void updateRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }
}
