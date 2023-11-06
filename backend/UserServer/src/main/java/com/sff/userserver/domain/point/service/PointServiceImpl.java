package com.sff.userserver.domain.point.service;

import com.sff.userserver.domain.member.entity.Member;
import com.sff.userserver.domain.member.repository.MemberRepository;
import com.sff.userserver.domain.point.dto.PointAmountResponse;
import com.sff.userserver.domain.point.dto.PointUpdateRequest;
import com.sff.userserver.domain.point.entity.Point;
import com.sff.userserver.global.error.type.BaseException;
import com.sff.userserver.global.utils.ApiError;
import lombok.Builder;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@Builder
@RequiredArgsConstructor
public class PointServiceImpl implements PointService {
    private final MemberRepository memberRepository;

    @Override
    public PointAmountResponse getMyPoint(Long memberId) {
        Member member = memberRepository.findByMemberId(memberId)
                .orElseThrow(() -> new BaseException(new ApiError("존재하지 않는 사용자입니다", 1101)));
        return new PointAmountResponse(member.getPoint().getAmount());
    }

    @Transactional
    @Override
    public void updatePoint(Long memberId, PointUpdateRequest pointUpdateRequest) {
        Member member = memberRepository.findByMemberId(memberId)
                .orElseThrow(() -> new BaseException(new ApiError("존재하지 않는 사용자입니다", 1101)));
        Point point = member.getPoint();
        if (pointUpdateRequest.getIsCharge()) {
            point.addPoints(pointUpdateRequest.getAmount());
        } else {
            point.deductPoints(pointUpdateRequest.getAmount());
        }
    }
}
