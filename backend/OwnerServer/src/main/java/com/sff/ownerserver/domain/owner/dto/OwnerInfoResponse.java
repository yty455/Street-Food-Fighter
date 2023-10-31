package com.sff.ownerserver.domain.owner.dto;

import com.sff.ownerserver.domain.owner.entity.Owner;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class OwnerInfoResponse {
    private String email;
    private String phone;
    private String name;
    private String bank;
    private String accountNumber;

    @Builder
    public OwnerInfoResponse(Owner owner) {
        this.email = owner.getEmail();
        this.phone = owner.getPhone();
        this.name = owner.getName();
        this.bank = owner.getBank();
        this.accountNumber = owner.getAccountNumber();
    }
}
