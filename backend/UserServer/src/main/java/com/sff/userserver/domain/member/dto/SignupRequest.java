package com.sff.userserver.domain.member.dto;

import com.sff.userserver.domain.member.entity.Member;
import com.sff.userserver.domain.member.entity.Role;
import com.sff.userserver.domain.member.entity.SocialType;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class SignupRequest {

    @Email(message = "올바른 이메일을 입력해주세요.")
    @NotBlank(message = "이메일을 입력해주세요.")
    private String email;
    @NotBlank(message = "비밀번호를 입력해주세요.")
    private String password;
    @NotBlank(message = "닉네임을 입력해주세요.")
    @Size(min = 1, max = 10, message = "닉네임은 10자까지 가능합니다.")
    private String nickname;
    @NotBlank(message = "휴대폰 번호를 입력해주세요.")
    @Pattern(regexp = "^\\d{3}-\\d{4}-\\d{4}$", message = "올바른 휴대폰 번호를 입력해주세요.")
    private String phone;
    private String imageUrl;
    private String region1;
    private String region2;
    private String region3;
    private String region4;
    private String paymentPassword;

    @Builder
    public SignupRequest(String email, String password, String nickname, String phone, String imageUrl, Role role, SocialType socialType, String socialId, String region1, String region2, String region3, String region4, String paymentPassword) {
        this.email = email;
        this.password = password;
        this.nickname = nickname;
        this.phone = phone;
        this.imageUrl = imageUrl;
        this.region1 = region1;
        this.region2 = region2;
        this.region3 = region3;
        this.region4 = region4;
        this.paymentPassword = paymentPassword;
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
