package com.sff.userserver.domain.point.service;

import com.sff.userserver.domain.point.dto.PointAmountResponse;
import com.sff.userserver.domain.point.dto.PointUpdateRequest;

public interface PointService {
    PointAmountResponse getMyPoint(Long memberId);

    void updatePoint(Long memberId, PointUpdateRequest pointUpdateRequest);
}
