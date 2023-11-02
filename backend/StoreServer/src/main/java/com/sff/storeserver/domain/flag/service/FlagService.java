package com.sff.storeserver.domain.flag.service;

import com.sff.storeserver.common.error.code.FlagError;
import com.sff.storeserver.common.error.code.StoreError;
import com.sff.storeserver.common.error.type.BaseException;
import com.sff.storeserver.domain.flag.dto.FlagDetailResponse;
import com.sff.storeserver.domain.flag.dto.FlagRequest;
import com.sff.storeserver.domain.flag.dto.FlagResponse;
import com.sff.storeserver.domain.flag.entity.Flag;
import com.sff.storeserver.domain.flag.repository.FlagRepository;
import com.sff.storeserver.domain.store.entity.Store;
import com.sff.storeserver.domain.store.repository.StoreRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class FlagService {
    private final FlagRepository flagRepository;
    private final StoreRepository storeRepository;

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
        // TODO - 깃발 ID를 주문 서비스에 보내서 깃발의 펀딩 금액 받아 오기
        List<FlagResponse> flagResponses = new ArrayList<>();
        for (int idx = 0; idx < flagList.size(); idx++) {
            flagResponses.add(FlagResponse.fromEntity(flagList.get(idx), 36500));
        }

        return flagResponses;
    }


    public FlagDetailResponse getFlagDetail(Long storeId, Long flagId) {
        Flag flag = flagRepository.findById(flagId)
                .orElseThrow(() -> new BaseException(FlagError.NOT_FOUND_FLAG));

        if (flag.getStore().getId() != storeId) {
            throw new BaseException(StoreError.NOT_FOUND_STORE);
        }
        // 펀딩 서비스에 깃발 ID 보내서 총 얼마, 누구 모든 정보 받아오기

        return FlagDetailResponse.fromEntity(flag);
    }


}
