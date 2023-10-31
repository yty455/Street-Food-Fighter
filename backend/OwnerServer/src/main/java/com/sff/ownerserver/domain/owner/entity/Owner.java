package com.sff.ownerserver.domain.owner.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;

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
    private String phone;
    private String name;
    private String bank;
    private String accountNumber;
    private String refreshToken;

    @Builder
    public Owner(String email, String password, String phone, String name, String bank, String accountNumber, String refreshToken) {
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.name = name;
        this.bank = bank;
        this.accountNumber = accountNumber;
        this.refreshToken = refreshToken;
    }

    // 비밀번호 암호화 메소드
    public void passwordEncode(PasswordEncoder passwordEncoder) {
        this.password = passwordEncoder.encode(this.password);
    }

    public void updateRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }



}
