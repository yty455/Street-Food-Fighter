package com.sff.ownerserver.domain.owner.service;

import com.sff.ownerserver.domain.owner.dto.*;

public interface OwnerService {
    void signUp(SignupRequest signupRequest);

    void deleteOwner(Long ownerId);

    OwnerInfoResponse getOwner(Long ownerId);

    void updateOwner(Long ownerId, MyInfoRequest myInfoRequest);

    void updatePoint(Long ownerId, PointUpdateRequest pointUpdateRequest);

    OwnerFcmTokenResponse getFcmToken(Long ownerId);
}
