package com.sff.userserver.domain.point.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class PointUpdateRequest {
    @NotNull(message = "금액을 입력해주세요.")
    @Max(value = 100000000, message = "최대 충전/사용 금액은 1억원 입니다.")
    private Integer amount;
    @NotNull(message = "충전인지 아닌지 입력해주세요.")
    private Boolean isCharge;
}
