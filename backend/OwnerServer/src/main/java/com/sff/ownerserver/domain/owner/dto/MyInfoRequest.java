package com.sff.ownerserver.domain.owner.dto;

import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class MyInfoRequest {

    @Size(min = 1, max = 5, message = "이름은 5자까지 가능합니다.")
    private String name;
    @Pattern(regexp = "^\\d{3}-\\d{4}-\\d{4}$", message = "올바른 휴대폰 번호를 입력해주세요.")
    private String phone;
    private String bank;
    private String accountNumber;

    @Builder
    public MyInfoRequest(String name, String phone, String bank, String accountNumber) {
        this.name = name;
        this.phone = phone;
        this.bank = bank;
        this.accountNumber = accountNumber;
    }
}
