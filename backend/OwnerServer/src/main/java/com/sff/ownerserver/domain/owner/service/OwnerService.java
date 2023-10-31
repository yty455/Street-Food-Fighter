package com.sff.ownerserver.domain.owner.service;

import com.sff.ownerserver.domain.owner.dto.SignupRequest;

public interface OwnerService {
    void signUp(SignupRequest signupRequest);
}
