package com.sff.userserver.domain.member.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sff.userserver.domain.member.dto.*;
import com.sff.userserver.domain.member.entity.Grade;
import com.sff.userserver.domain.member.entity.Member;
import com.sff.userserver.domain.member.entity.Role;
import com.sff.userserver.domain.member.entity.SocialType;
import com.sff.userserver.domain.member.repository.MemberRepository;
import com.sff.userserver.domain.point.entity.Point;
import com.sff.userserver.domain.point.repository.PointRepository;
import com.sff.userserver.global.error.type.BaseException;
import com.sff.userserver.global.utils.ApiError;
import lombok.Builder;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@Builder
@RequiredArgsConstructor
@Slf4j
public class MemberServiceImpl implements MemberService {
    private final ObjectMapper objectMapper = new ObjectMapper();
    private final MemberRepository memberRepository;
    private final PointRepository pointRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public void signUp(SignupRequest signupRequest) {
        Point newPoint = Point.create(signupRequest.getPaymentPassword());
        if (signupRequest.getSocialId() != null) {
            updateMemberWithSocialId(signupRequest, newPoint);
        } else {
            createNewMember(signupRequest, newPoint);
        }

        pointRepository.save(newPoint);
    }

    private void createNewMember(SignupRequest signupRequest, Point point) {
        validateDuplicateMember(signupRequest);
        Member member = signupRequest.toEntity();
        member.passwordEncode(passwordEncoder);
        member.updatePoint(point);
        memberRepository.save(member);
    }

    private void updateMemberWithSocialId(SignupRequest signupRequest, Point point) {
        Member member = memberRepository.findBySocialTypeAndSocialId(SocialType.KAKAO, signupRequest.getSocialId())
                .orElseThrow(() -> new BaseException(new ApiError("존재하지 않는 사용자입니다", 1101)));
        member.update(signupRequest);
        member.updateRole(Role.USER);
        member.updatePoint(point);
    }

    private void validateDuplicateMember(SignupRequest signupRequest) {
        memberRepository.findByEmail(signupRequest.getEmail())
                .ifPresent(m -> {
                    throw new BaseException(new ApiError("이미 존재하는 계정입니다.", 1111));
                });
    }

    @Override
    @Transactional
    public void deleteMember(Long memberId) {
        if (memberRepository.existsById(memberId)) {
            memberRepository.deleteById(memberId);
        } else {
            throw new BaseException(new ApiError("존재하지 않는 사용자입니다.", 1101));
        }
    }

    @Override
    public MemberInfoResponse getMember(Long memberId) {
        return MemberInfoResponse.builder().member(findMember(memberId)).build();

    }

    @Transactional
    public void updateMember(Long memberId, MyInfoRequest myInfoRequest) {
        Member member = findMember(memberId);
        member.update(myInfoRequest);
    }

    @Override
    public Member findMember(Long memberId) {
        return memberRepository.findById(memberId)
                .orElseThrow(() -> new BaseException(new ApiError("존재하지 않는 사용자입니다", 1101)));
    }

    @Override
    public List<MemberInfoResponse> getMembers(List<Long> memberIds) {
        List<Member> members = memberRepository.findAllById(memberIds);
        return members.stream()
                .map(member -> MemberInfoResponse.builder().member(member).build())
                .toList();
    }

    @Override
    @KafkaListener(topics = "order-service-update-user")
    @Transactional
    public void updateGrade(@Payload String stringGradeUpdateRequest) throws JsonProcessingException {
        log.info("Kafka - 회원 등급 수정 : {}", stringGradeUpdateRequest);
        GradeUpdateRequestList gradeUpdateRequestList = objectMapper.readValue(stringGradeUpdateRequest, GradeUpdateRequestList.class);

        List<GradeUpdateRequest> gradeUpdateRequests = gradeUpdateRequestList.getGradeUpdateRequests();
        Map<Long, Member> memberMap = memberRepository.findAllById(
                        gradeUpdateRequests.stream()
                                .map(GradeUpdateRequest::getMemberId)
                                .collect(Collectors.toSet()))
                .stream()
                .collect(Collectors.toMap(Member::getId, Function.identity()));

        List<Long> missingMemberIds = new ArrayList<>();
        gradeUpdateRequests.forEach(gradeUpdateRequest -> {
            Member member = memberMap.get(gradeUpdateRequest.getMemberId());
            if (member == null) {
                missingMemberIds.add(gradeUpdateRequest.getMemberId());
            } else {
                member.updateGrade(determineGrade(gradeUpdateRequest.getOrderCount()));
            }
        });

        if (!missingMemberIds.isEmpty()) {
            log.error("Member not found for IDs: {}", missingMemberIds);
        }
    }

    @Override
    public List<MemberFcmTokenResponse> getFcmTokens(List<Long> memberIds) {
        List<Member> members = memberRepository.findAllById(memberIds);
        return members.stream()
                .map(member -> new MemberFcmTokenResponse(member.getId(), member.getFcmToken()))
                .toList();
    }

    private Grade determineGrade(int orderCount) {
        if (orderCount < 5) {
            return Grade.LIGHT;
        } else if (orderCount < 10) {
            return Grade.MIDDLE;
        } else if (orderCount < 20) {
            return Grade.HEAVY;
        } else {
            return Grade.CHAMPION;
        }
    }
}
