package com.sff.storeserver.domain.flag.service;

import com.sff.storeserver.common.error.code.FlagError;
import com.sff.storeserver.common.error.code.StoreError;
import com.sff.storeserver.common.error.type.BaseException;
import com.sff.storeserver.domain.flag.dto.*;
import com.sff.storeserver.domain.flag.entity.Flag;
import com.sff.storeserver.domain.flag.repository.FlagRepository;
import com.sff.storeserver.domain.store.controller.Svc1FeignClient;
import com.sff.storeserver.domain.store.entity.Store;
import com.sff.storeserver.domain.store.repository.StoreRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
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

    @Autowired
    private Svc1FeignClient svc1FeignClient;

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
        List<FlagFundingInfo> flagFundingInfos = svc1FeignClient.getFundingAmount(FlagFundingRequest.builder().flags(flagIdList).build()).getResponse();
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

        // 펀딩 서비스에 깃발 ID 보내서 총 얼마, 누구 모든 정보 받아오기
//        int fundingAmount = 0;
//        Map<UserGrade, Integer> fundingUserGrade = Arrays.stream(UserGrade.values())
//                .collect(Collectors.toMap(grade -> grade, grade -> 0));

        List<FundingUserInfo> fundingUserInfoList = new ArrayList<>();

        // 테스트
        List<FundingMenuInfo> fundingMenuInfoList1 = new ArrayList<>();
        List<FundingMenuInfo> fundingMenuInfoList2 = new ArrayList<>();
        fundingMenuInfoList1.add(FundingMenuInfo.builder().menuName("붕어빵").count(4).build());
        fundingMenuInfoList1.add(FundingMenuInfo.builder().menuName("슈크림 붕어빵").count(2).build());
        fundingMenuInfoList2.add(FundingMenuInfo.builder().menuName("와플").count(1).build());
        fundingUserInfoList.add(FundingUserInfo.builder().userName("성인").userGrade(UserGrade.LIGHT).totalPrice(3000).fundingMenuInfoList(fundingMenuInfoList1).build());
        fundingUserInfoList.add(FundingUserInfo.builder().userName("동윤").userGrade(UserGrade.MIDDLE).totalPrice(6500).fundingMenuInfoList(fundingMenuInfoList2).build());
        fundingUserInfoList.add(FundingUserInfo.builder().userName("배성").userGrade(UserGrade.CHAMPION).totalPrice(8000).fundingMenuInfoList(fundingMenuInfoList2).build());
        fundingUserInfoList.add(FundingUserInfo.builder().userName("재영").userGrade(UserGrade.CHAMPION).totalPrice(9000).fundingMenuInfoList(fundingMenuInfoList1).build());

        int fundingAmount = fundingUserInfoList.stream()
                .mapToInt(FundingUserInfo::getTotalPrice)
                .sum();

        Map<UserGrade, Integer> fundingUserGrade = fundingUserInfoList.stream()
                .collect(Collectors.groupingBy(FundingUserInfo::getUserGrade, Collectors.summingInt(u -> 1)));


        return FlagDetailResponse.fromEntity(flag, fundingAmount, fundingUserGrade, fundingUserInfoList);
    }


}
