package com.sff.ownerserver.domain.owner.service;

import com.sff.ownerserver.domain.owner.dto.SignupRequest;
import com.sff.ownerserver.domain.owner.entity.Owner;
import com.sff.ownerserver.domain.owner.repository.OwnerRepository;
import com.sff.ownerserver.global.error.type.BaseException;
import com.sff.ownerserver.global.utils.ApiError;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class OwnerServiceImpl implements OwnerService {
    private final OwnerRepository ownerRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public void signUp(SignupRequest signupRequest) {
        validateDuplicateMember(signupRequest);
        Owner owner = signupRequest.toEntity();
        owner.passwordEncode(passwordEncoder);
        // TODO: 포인트 생성하기(결제 비밀번호, 금액)
        ownerRepository.save(owner);
    }

    private void validateDuplicateMember(SignupRequest signupRequest) {
        ownerRepository.findByEmail(signupRequest.getEmail())
                .ifPresent(m -> {
                    throw new BaseException(new ApiError("이미 존재하는 계정입니다.", 1211));
                });
    }

}
