package com.sff.ownerserver.domain.owner.entity;

import com.sff.ownerserver.domain.owner.dto.MyInfoRequest;
import com.sff.ownerserver.global.error.type.BaseException;
import com.sff.ownerserver.global.utils.ApiError;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.function.Consumer;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Owner {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "OWNER_ID")
    private Long id;

    private String email;
    private String password;
    private String name;
    private String phone;
    private String bank;
    private String accountNumber;
    private Long amount;
    private String refreshToken;

    @Builder
    public Owner(String email, String password, String name, String phone, String bank, String accountNumber, Long amount, String refreshToken) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.phone = phone;
        this.bank = bank;
        this.accountNumber = accountNumber;
        this.amount = amount;
        this.refreshToken = refreshToken;
    }

    // 비밀번호 암호화 메소드
    public void passwordEncode(PasswordEncoder passwordEncoder) {
        this.password = passwordEncoder.encode(this.password);
    }

    public void updateRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }


    public void update(MyInfoRequest myInfoRequest) {
        this.phone = phone;
        this.name = name;
        this.bank = bank;
        this.accountNumber = accountNumber;
        updateName(myInfoRequest.getName());
        updatePhone(myInfoRequest.getPhone());
        updateBank(myInfoRequest.getBank());
        updateAccountNumber(myInfoRequest.getAccountNumber());
    }

    private void updateName(String name) {
        updateIfNotNull(newValue -> this.name = newValue, name);
    }

    public void updatePhone(String phone) {
        updateIfNotNull(newValue -> this.phone = newValue, phone);
    }

    private void updateBank(String bank) {
        updateIfNotNull(newValue -> this.bank = newValue, bank);
    }

    private void updateAccountNumber(String accountNumber) {
        updateIfNotNull(newValue -> this.accountNumber = newValue, accountNumber);
    }

    private <T> void updateIfNotNull(Consumer<T> updater, T newValue) {
        if (newValue != null) {
            updater.accept(newValue);
        }
    }

    public void addPoints(Long amount) {
        this.amount += amount;
    }

    public void deductPoints(Long amount) {
        if (this.amount < amount) {
            throw new BaseException(new ApiError("보유 포인트가 결제 포인트보다 적습니다.", 1221));
        }
    }
}
