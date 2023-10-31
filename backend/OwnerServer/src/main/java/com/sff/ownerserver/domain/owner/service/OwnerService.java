package com.sff.ownerserver.domain.owner.service;

import com.sff.ownerserver.domain.owner.dto.MyInfoRequest;
import com.sff.ownerserver.domain.owner.dto.OwnerInfoResponse;
import com.sff.ownerserver.domain.owner.dto.SignupRequest;

public interface OwnerService {
    void signUp(SignupRequest signupRequest);

    void deleteOwner(Long ownerId);

    OwnerInfoResponse getOwner(Long ownerId);

    void updateMember(Long ownerId, MyInfoRequest myInfoRequest);
}
