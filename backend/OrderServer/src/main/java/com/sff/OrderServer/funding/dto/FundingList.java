package com.sff.OrderServer.funding.dto;

import com.sff.OrderServer.funding.entity.Funding;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class FundingList {
    private List<Long> fundings;
}
