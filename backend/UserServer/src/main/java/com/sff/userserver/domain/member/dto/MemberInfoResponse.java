package com.sff.userserver.domain.member.dto;

import com.sff.userserver.domain.member.entity.Grade;
import com.sff.userserver.domain.member.entity.Member;
import com.sff.userserver.domain.member.entity.Role;
import com.sff.userserver.domain.member.entity.SocialType;
import lombok.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MemberInfoResponse {
    private String email;
    private String nickname;
    private String phone;
    private String imageUrl;
    private Grade grade;
    private Role role;
    private SocialType socialType;
    private String region1;
    private String region2;
    private String region3;
    private String region4;
    private Long userId;

    @Builder
    public MemberInfoResponse(Member member) {
        this.email = member.getEmail();
        this.nickname = member.getNickname();
        this.phone = member.getPhone();
        this.imageUrl = member.getImageUrl();
        this.grade = member.getGrade();
        this.role = member.getRole();
        this.socialType = member.getSocialType();
        this.region1 = member.getAddress().getRegion1();
        this.region2 = member.getAddress().getRegion2();
        this.region3 = member.getAddress().getRegion3();
        this.region4 = member.getAddress().getRegion4();
        this.userId = member.getId();
    }
}
