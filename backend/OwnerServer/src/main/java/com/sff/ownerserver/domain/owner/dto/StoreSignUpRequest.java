package com.sff.ownerserver.domain.owner.dto;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class StoreSignUpRequest {
    private Long ownerId;
    private String name;
    private String ownerName;
    private String phone;
    private String businessCategory;
    private String category;
    private String openTime;
    private String closeTime;

    @Builder
    public StoreSignUpRequest(Long ownerId, SignupRequest signupRequest) {
        this.ownerId = ownerId;
        this.name = signupRequest.getStoreName();
        this.ownerName = signupRequest.getName();
        this.phone = signupRequest.getPhone();
        this.businessCategory = signupRequest.getBusinessCategory();
        this.category = signupRequest.getCategory();
        this.openTime = signupRequest.getOpenTime();
        this.closeTime = signupRequest.getCloseTime();
    }
}
