package com.sff.OrderServer.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
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

}
