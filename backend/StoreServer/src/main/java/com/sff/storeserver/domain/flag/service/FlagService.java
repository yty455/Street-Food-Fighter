package com.sff.storeserver.domain.flag.service;

import com.sff.storeserver.common.error.code.FlagError;
import com.sff.storeserver.common.error.code.StoreError;
import com.sff.storeserver.common.error.type.BaseException;
import com.sff.storeserver.common.feignClient.OrderClient;
import com.sff.storeserver.common.feignClient.UserClient;
import com.sff.storeserver.domain.flag.dto.*;
import com.sff.storeserver.domain.flag.entity.Flag;
import com.sff.storeserver.domain.flag.repository.FlagRepository;
import com.sff.storeserver.domain.review.dto.ReviewUserInfoRequest;
import com.sff.storeserver.domain.store.entity.Store;
import com.sff.storeserver.domain.store.repository.StoreRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class FlagService {
    private final FlagRepository flagRepository;
    private final StoreRepository storeRepository;

    private final UserClient userClient;
    private final OrderClient orderClient;

    @Transactional
    public Long createFlag(FlagRequest flagRequest) {
        Store findStore = storeRepository.findById(flagRequest.getStoreId())
                .orElseThrow(() -> new BaseException(StoreError.NOT_FOUND_STORE));

        return flagRepository.save(flagRequest.toEntity(findStore)).getId();
    }

    public List<FlagResponse> getFlags(Long storeId, LocalDate date) {
        List<Flag> flagList = flagRepository.findByStoreIdAndDate(storeId, date);
        List<Long> flagIdList = flagList.stream()
                .map(Flag::getId)
                .toList();
        // 깃발 ID를 주문 서비스에 보내서 깃발의 펀딩 금액 받아 오기
        List<FlagFundingInfo> flagFundingInfos = orderClient.getFundingAmount(FlagFundingRequest.builder().flags(flagIdList).build()).getResponse();
        List<FlagResponse> flagResponses = new ArrayList<>();
        for (int idx = 0; idx < flagList.size(); idx++) {
            flagResponses.add(FlagResponse.fromEntity(flagList.get(idx), flagFundingInfos.get(idx).getAmount()));
        }

        return flagResponses;
    }


    public FlagDetailResponse getFlagDetail(Long storeId, Long flagId) {
        Flag flag = flagRepository.findById(flagId)
                .orElseThrow(() -> new BaseException(FlagError.NOT_FOUND_FLAG));

        // 가게 ID를 받을 필요가 있는지,,,
        if (flag.getStore().getId() != storeId) {
            throw new BaseException(StoreError.NOT_FOUND_STORE);
        }

        // 깃발 ID로 주문서비스에서 회원ID,주문정보 받아오기
        List<FundingUserInfo> fundingUserInfoList = orderClient.getFundingUsers(flag.getId()).getResponse();

        // 회원ID List로 회원서비스에서 회원정보 받아오기
        List<FundingUserDetailInfo> fundingUserDetailInfoList = userClient.getUserFundingInfo(ReviewUserInfoRequest.builder()
                .memberIds(fundingUserInfoList.stream().map(FundingUserInfo::getUserId).toList()).build()).getResponse();
        // 합치기
        for (int idx = 0; idx < fundingUserDetailInfoList.size(); idx++) {
            fundingUserInfoList.get(idx).updateUserInfo(fundingUserDetailInfoList.get(idx).getNickname(), fundingUserDetailInfoList.get(idx).getGrade());
        }

        int fundingAmount = fundingUserInfoList.stream()
                .mapToInt(FundingUserInfo::getTotalPrice)
                .sum();

        // 등급 있는것 만 체크됨
        Map<UserGrade, Integer> fundingUserGrade = fundingUserInfoList.stream()
                .collect(Collectors.groupingBy(FundingUserInfo::getUserGrade, Collectors.summingInt(u -> 1)));

        return FlagDetailResponse.fromEntity(flag, fundingAmount, fundingUserGrade, fundingUserInfoList);
    }
}
