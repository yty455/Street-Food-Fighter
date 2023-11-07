package com.sff.OrderServer.funding.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class FundingChosen {
    private Long pickedFlagId;
    private List<Long> unpickedFlagIds;
}
