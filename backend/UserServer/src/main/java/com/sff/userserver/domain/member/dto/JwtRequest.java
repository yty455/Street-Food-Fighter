package com.sff.userserver.domain.member.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class JwtRequest {
    @NotNull
    private String refreshToken;
}
