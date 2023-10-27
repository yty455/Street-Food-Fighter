package com.sff.userserver.domain.Member.dto;

import com.sff.userserver.domain.Member.entity.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;

@NoArgsConstructor
@Getter
public class MemberSignupRequest {

    private String email;
    private String password;
    private String nickname;
    private String phone;
    private String imageUrl;
    private String region1;
    private String region2;
    private String region3;
    private String region4;

    @Builder
    public MemberSignupRequest(String email, String password, String nickname, String phone, String imageUrl, Role role, SocialType socialType, String socialId, String region1, String region2, String region3, String region4, PasswordEncoder passwordEncoder) {
        this.email = email;
        this.password = passwordEncoder.encode(password);
        this.nickname = nickname;
        this.phone = phone;
        this.imageUrl = imageUrl;
        this.region1 = region1;
        this.region2 = region2;
        this.region3 = region3;
        this.region4 = region4;
    }

    public Member toEntity() {
        return Member.builder()
                .email(email)
                .password(password)
                .nickname(nickname)
                .phone(phone)
                .imageUrl(imageUrl)
                .role(Role.USER)
                .region1(region1)
                .region2(region2)
                .region3(region3)
                .region4(region4).build();
    }
}
