package com.sff.userserver.domain.member.dto;

import com.sff.userserver.domain.member.entity.Member;
import com.sff.userserver.domain.member.entity.Role;
import jakarta.validation.constraints.*;
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
    @Pattern(regexp = "^010-\\d{4}-\\d{4}$", message = "올바른 휴대폰 번호를 입력해주세요.")
    private String phone;
    @NotNull
    @Pattern(regexp = "^$|^(http://|https://).*$", message = "올바른 이미지 URL을 입력해주세요.")
    private String imageUrl;
    @NotBlank(message = "시/도 단위 지역을 입력해주세요.")
    private String region1;
    @NotBlank(message = "구/군 단위 지역을 입력해주세요.")
    private String region2;
    @NotBlank(message = "동 단위 지역을 입력해주세요.")
    private String region3;
    private String region4;
    @NotBlank(message = "결제 비밀번호를 입력해주세요.")
    @Pattern(regexp = "^\\d{6}$", message = "결제 비밀번호는 숫자 6자리를 입력해주세요.")
    private String paymentPassword;
    private String socialId;

    @Builder
    public SignupRequest(String email, String password, String nickname, String phone, String imageUrl, String region1, String region2, String region3, String region4, String paymentPassword, String socialId) {
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
        this.socialId = socialId;
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
                .region4(region4)
                .socialId(socialId).build();
    }
}
