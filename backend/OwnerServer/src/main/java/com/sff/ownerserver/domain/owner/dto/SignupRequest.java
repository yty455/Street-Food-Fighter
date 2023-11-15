package com.sff.ownerserver.domain.owner.dto;

import com.sff.ownerserver.domain.owner.entity.Owner;
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
    @NotBlank(message = "이름을 입력해주세요")
    @Size(min = 1, max = 5, message = "이름은 5자까지 가능합니다.")
    private String name;
    @NotBlank(message = "휴대폰 번호를 입력해주세요.")
    @Pattern(regexp = "^010-\\d{4}-\\d{4}$", message = "올바른 휴대폰 번호를 입력해주세요.")
    private String phone;
    private String bank;
    private String accountNumber;
    private String fcmToken;
    private String storeName;
    private String openTime;
    private String closeTime;
    private String businessCategory;
    private String category;

    @Builder
    public SignupRequest(String email, String password, String name, String phone, String bank, String accountNumber, String fcmToken) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.phone = phone;
        this.bank = bank;
        this.accountNumber = accountNumber;
        this.fcmToken = fcmToken;
    }

    public Owner toEntity() {
        return Owner.builder()
                .email(email)
                .password(password)
                .name(name)
                .phone(phone)
                .bank(bank)
                .accountNumber(accountNumber)
                .amount(0L)
                .fcmToken(fcmToken).build();
    }
}
