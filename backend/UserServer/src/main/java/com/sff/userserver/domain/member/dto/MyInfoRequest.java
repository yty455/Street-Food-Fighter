package com.sff.userserver.domain.member.dto;

import com.sff.userserver.domain.member.entity.Role;
import com.sff.userserver.domain.member.entity.SocialType;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;

@Getter
@NoArgsConstructor
public class MyInfoRequest {
    @Size(min = 1, max = 10, message = "닉네임은 10자까지 가능합니다.")
    private String nickname;
    @Pattern(regexp = "^\\d{3}-\\d{4}-\\d{4}$", message = "올바른 휴대폰 번호를 입력해주세요.")
    private String phone;
    private String imageUrl;
    private String region1;
    private String region2;
    private String region3;
    private String region4;

    @Builder
    public MyInfoRequest(String nickname, String phone, String imageUrl, Role role, SocialType socialType, String socialId, String region1, String region2, String region3, String region4, PasswordEncoder passwordEncoder) {
        this.nickname = nickname;
        this.phone = phone;
        this.imageUrl = imageUrl;
        this.region1 = region1;
        this.region2 = region2;
        this.region3 = region3;
        this.region4 = region4;
    }
}
