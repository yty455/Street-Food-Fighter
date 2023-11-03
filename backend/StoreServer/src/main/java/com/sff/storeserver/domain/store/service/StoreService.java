package com.sff.storeserver.domain.store.service;

import com.sff.storeserver.common.error.code.StoreError;
import com.sff.storeserver.common.error.type.BaseException;
import com.sff.storeserver.domain.flag.entity.Flag;
import com.sff.storeserver.domain.flag.repository.FlagRepository;
import com.sff.storeserver.domain.store.dto.StoreInfo;
import com.sff.storeserver.domain.store.dto.StoreInfoResponse;
import com.sff.storeserver.domain.store.dto.StoreUpdateCategory;
import com.sff.storeserver.domain.store.dto.StoreUpdateInfo;
import com.sff.storeserver.domain.store.entity.CategoryType;
import com.sff.storeserver.domain.store.entity.Store;
import com.sff.storeserver.domain.store.repository.StoreRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class StoreService {

    private final StoreRepository storeRepository;
    private final FlagRepository flagRepository;

    @Transactional
    public void createStore(StoreInfo storeInfo) {
        storeRepository.save(storeInfo.toEntity());
    }

    public StoreInfoResponse getStore(Long ownerId) {
        return StoreInfoResponse.fromEntity(storeRepository.findByOwnerId(ownerId)
                .orElseThrow(() ->
                        new BaseException(StoreError.NOT_FOUND_STORE)));
    }

    public void updateStore(StoreUpdateInfo storeUpdateInfo, Long ownerId) {
        Store store = storeRepository.findByOwnerId(ownerId).orElseThrow(() ->
                new BaseException(StoreError.NOT_FOUND_STORE));
        store.update(storeUpdateInfo);
    }

    public void updateStoreCategory(StoreUpdateCategory storeUpdateCategory, Long ownerId) {
        Store store = storeRepository.findByOwnerId(ownerId).orElseThrow(() ->
                new BaseException(StoreError.NOT_FOUND_STORE));
        store.updateCategory(storeUpdateCategory);
    }

    public List<StoreInfoResponse> getNearStore(double lati, double longi, List<CategoryType> categories) {
        List<Store> nearbyStores = storeRepository.findNearStore(lati, longi);

        // 카테고리 필터링 (예: 선택한 카테고리에 속하는 가게만 선택)
        return nearbyStores
                .stream()
                .filter(store -> categories.contains(store.getCategory()))
                .map(StoreInfoResponse::fromEntity)
                .toList();

    }

    public List<StoreInfoResponse> getNearFlag(Date date, double lati, double longi, List<CategoryType> categories) {
        List<Store> nearbyFlags = storeRepository.findNearFlag(lati, longi, date);

        // 카테고리 필터링 (예: 선택한 카테고리에 속하는 가게만 선택)

        return nearbyFlags
                .stream()
                .filter(store -> categories.contains(store.getCategory()))
                .map(StoreInfoResponse::fromEntity)
                .toList();
    }

    public void startBusiness(Long ownerId, Long flagId) {

        Store store = storeRepository.findByOwnerId(ownerId).orElseThrow(() ->
                new BaseException(StoreError.NOT_FOUND_STORE));

        if (flagId != 0) {
            List<Flag> flags = flagRepository.findByStoreIdAndDate(store.getId(), LocalDate.now());
            flags.forEach(flag -> {
                if (flagId == flag.getId()) {
                    fundingSuccess(flag);
                } else {
                    fundingFailure(flag);
                }
            });
        }

        store.startBusiness();

    }

    public void closeBusiness(Long ownerId) {

        Store store = storeRepository.findByOwnerId(ownerId).orElseThrow(() ->
                new BaseException(StoreError.NOT_FOUND_STORE));

        store.closeBusiness();

    }


    public void fundingSuccess(Flag flag) {
        // 주문 서비스에 깃발ID 보내서 펀딩 성공 알림 보내기
        flag.fundingSuccess();
    }

    public void fundingFailure(Flag flag) {
        // 주문 서비스에 깃발ID 보내서 펀딩 실패 알림 보내기
        flag.fundingFailed();
    }


}
