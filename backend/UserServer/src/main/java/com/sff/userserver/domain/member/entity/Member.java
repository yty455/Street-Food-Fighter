package com.sff.userserver.domain.member.entity;

import com.sff.userserver.domain.member.dto.MyInfoRequest;
import com.sff.userserver.domain.member.dto.SignupRequest;
import com.sff.userserver.domain.point.entity.Point;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Consumer;

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
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "POINT_ID")
    private Point point;
    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Wishlist> wishlists = new ArrayList<>();

    @Builder
    public Member(String email, String password, String nickname, String phone, String imageUrl, Role role, SocialType socialType, String socialId, String refreshToken, String region1, String region2, String region3, String region4, Point point) {
        this.email = email;
        this.password = password;
        this.nickname = nickname;
        this.phone = phone;
        this.imageUrl = imageUrl;
        this.grade = Grade.LIGHT;
        this.role = role;
        this.socialType = socialType;
        this.socialId = socialId;
        this.refreshToken = refreshToken;
        this.address = new Address(region1, region2, region3, region4);
        this.point = point;
    }

    // 비밀번호 암호화 메소드
    public void passwordEncode(PasswordEncoder passwordEncoder) {
        this.password = passwordEncoder.encode(this.password);
    }

    public void updateRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }

    public void update(MyInfoRequest myInfoRequest) {
        updateNickname(myInfoRequest.getNickname());
        updatePhone(myInfoRequest.getPhone());
        updateImageUrl(myInfoRequest.getImageUrl());
        updateAddress(myInfoRequest.getRegion1(), myInfoRequest.getRegion2(), myInfoRequest.getRegion3(), myInfoRequest.getRegion4());
    }

    public void update(SignupRequest signupRequest) {
        updateNickname(signupRequest.getNickname());
        updatePhone(signupRequest.getPhone());
        updateImageUrl(signupRequest.getImageUrl());
        updateAddress(signupRequest.getRegion1(), signupRequest.getRegion2(), signupRequest.getRegion3(), signupRequest.getRegion4());
    }


    public void updateNickname(String nickname) {
        updateIfNotNull(newValue -> this.nickname = newValue, nickname);
    }

    public void updatePhone(String phone) {
        updateIfNotNull(newValue -> this.phone = newValue, phone);
    }

    public void updateImageUrl(String imageUrl) {
        updateIfNotNull(newValue -> this.imageUrl = newValue, imageUrl);
    }

    public void updateRole(Role role) {
        updateIfNotNull(newValue -> this.role = newValue, role);
    }

    public void updateAddress(String region1, String region2, String region3, String region4) {
        if (region1 != null && region2 != null && region3 != null) {
            if (region4 != null) {
                this.address = new Address(region1, region2, region3, region4);
            } else {
                this.address = new Address(region1, region2, region3);
            }
        }
    }

    public void updatePoint(Point point) {
        this.point = point;
    }

    private <T> void updateIfNotNull(Consumer<T> updater, T newValue) {
        if (newValue != null) {
            updater.accept(newValue);
        }
    }

    public void updateGrade(Grade grade) {
        this.grade = grade;
    }
}
