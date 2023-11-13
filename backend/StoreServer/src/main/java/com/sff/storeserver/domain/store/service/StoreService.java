package com.sff.storeserver.domain.store.service;

import com.sff.storeserver.common.error.code.FeignError;
import com.sff.storeserver.common.error.code.StoreError;
import com.sff.storeserver.common.error.type.BaseException;
import com.sff.storeserver.common.feignClient.OrderClient;
import com.sff.storeserver.common.feignClient.PayClient;
import com.sff.storeserver.common.utils.ApiResult;
import com.sff.storeserver.domain.flag.dto.FlagNotificationInfo;
import com.sff.storeserver.domain.flag.entity.Flag;
import com.sff.storeserver.domain.flag.repository.FlagRepository;
import com.sff.storeserver.domain.review.repository.ReviewRepository;
import com.sff.storeserver.domain.store.dto.*;
import com.sff.storeserver.domain.store.entity.CategoryType;
import com.sff.storeserver.domain.store.entity.Store;
import com.sff.storeserver.domain.store.repository.MenuRepository;
import com.sff.storeserver.domain.store.repository.StoreRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class StoreService {

    private final StoreRepository storeRepository;
    private final MenuRepository menuRepository;
    private final FlagRepository flagRepository;
    private final ReviewRepository reviewRepository;

    private final OrderClient orderClient;
    private final PayClient payClient;


    @Transactional
    public void createStore(StoreInfo storeInfo) {
        storeRepository.save(storeInfo.toEntity());
    }

    public StoreInfoResponse getStore(Long ownerId) {
        return StoreInfoResponse.fromEntity(storeRepository.findByOwnerId(ownerId)
                .orElseThrow(() ->
                        new BaseException(StoreError.NOT_FOUND_STORE)));
    }

    public List<StoreInfoResponse> getStores(List<Long> ids) {
        return storeRepository.findAllById(ids).stream()
                .map(StoreInfoResponse::fromEntity)
                .toList();
    }

    public StoreDetailResponse getStoreDetail(Long storeId) {

        Store store = storeRepository.findById(storeId).orElseThrow(() ->
                new BaseException(StoreError.NOT_FOUND_STORE));

        // 메뉴 정보
        List<MenuInfoResponse> menuInfoResponseList = menuRepository.findByStoreId(storeId).stream().map(MenuInfoResponse::fromEntity).toList();
        // 리뷰 점수
        Double score = reviewRepository.getAverageScoreByStoreId(storeId);
        return StoreDetailResponse.fromEntity(store, menuInfoResponseList, score);
    }

    @Transactional
    public void updateStore(StoreUpdateInfo storeUpdateInfo, Long ownerId) {
        Store store = storeRepository.findByOwnerId(ownerId).orElseThrow(() ->
                new BaseException(StoreError.NOT_FOUND_STORE));
        store.update(storeUpdateInfo);
    }

    public StoreUpdateCategory getStoreCategory(Long ownerId) {
        Store store = storeRepository.findByOwnerId(ownerId).orElseThrow(() ->
                new BaseException(StoreError.NOT_FOUND_STORE));
        return StoreUpdateCategory.builder()
                .category(store.getCategory()).businessCategory(store.getBusinessCategory()).build();
    }

    @Transactional
    public void updateStoreCategory(StoreUpdateCategory storeUpdateCategory, Long ownerId) {
        Store store = storeRepository.findByOwnerId(ownerId).orElseThrow(() ->
                new BaseException(StoreError.NOT_FOUND_STORE));
        store.updateCategory(storeUpdateCategory);
    }

    @Transactional
    public void deleteStore(Long ownerId) {
        Store store = storeRepository.findByOwnerId(ownerId)
                .orElseThrow(() -> new BaseException(StoreError.NOT_FOUND_STORE));

        store.delete();
    }

    public List<StoreInfoResponse> getNearStore(String region1, String region2, String region3, String region4, List<CategoryType> categories) {
        List<Store> nearbyStores = storeRepository.findNearStore(region1, region2, region3, region4);

        // 카테고리 필터링 (예: 선택한 카테고리에 속하는 가게만 선택)
        return nearbyStores.stream()
                .filter(store -> categories.contains(store.getCategory()))
                .map(StoreInfoResponse::fromEntity)
                .toList();
    }

    public List<FlagStoreInfoResponse> getNearFlag(LocalDate date, String region1, String region2, String region3, String region4, List<CategoryType> categories) {
        List<Flag> nearByFlags = flagRepository.findNearFlag(region1, region2, region3, region4, date);

        // 카테고리 필터링 (예: 선택한 카테고리에 속하는 가게만 선택)
        return nearByFlags.stream()
                .filter(flag -> categories.contains(flag.getStore().getCategory()))
                .map(FlagStoreInfoResponse::fromEntity)
                .toList();
    }

    public Long getOwnerId(Long storeId) {

        Store store = storeRepository.findById(storeId).orElseThrow(() ->
                new BaseException(StoreError.NOT_FOUND_STORE));

        return store.getOwnerId();
    }

    public String getStoreName(Long storeId) {

        Store store = storeRepository.findById(storeId).orElseThrow(() ->
                new BaseException(StoreError.NOT_FOUND_STORE));

        return store.getName();
    }

    @Transactional
    public void startBusiness(Long ownerId, StoreStartInfo storeStartInfo) {

        Store store = storeRepository.findByOwnerId(ownerId).orElseThrow(() ->
                new BaseException(StoreError.NOT_FOUND_STORE));

        // 깃발 선택 했으면 펀딩 성공!!!
        if (storeStartInfo.getFlagId() != 0) {
            FlagNotificationInfo flagNotificationInfo = new FlagNotificationInfo();
            List<Flag> flags = flagRepository.findByStoreIdAndDate(store.getId(), LocalDate.now());
            flags.forEach(flag -> {
                if (storeStartInfo.getFlagId() == flag.getId()) {
                    flag.fundingSuccess();
                    flagNotificationInfo.updatePicked(flag.getId());
                } else {
                    flag.fundingFailed();
                    flagNotificationInfo.updateUnpicked(flag.getId());
                }
            });
            // 깃발에 펀딩한 유저에게 알림 전송
            try {
                ApiResult<String> result = payClient.notifyFlag(flagNotificationInfo);
            } catch (Exception ex) {
                log.error("[Store-server] Feign Client 에러 발생 {}", ex.getMessage());
                throw new BaseException(FeignError.FEIGN_ERROR);
            }
        }
        store.startBusiness(storeStartInfo);
    }

    @Transactional
    public void closeBusiness(Long ownerId) {

        Store store = storeRepository.findByOwnerId(ownerId).orElseThrow(() ->
                new BaseException(StoreError.NOT_FOUND_STORE));

        // 영업 종료 후 주문 서비스에 보내서 정산 금액 받기
        payClient.requestForSettlement();
        store.closeBusiness();

    }

    public Long getStoreIdByOwnerId(Long ownerId) {
        Store store = storeRepository.findByOwnerId(ownerId)
                .orElseThrow(() -> new BaseException(StoreError.NOT_FOUND_STORE));
        return store.getId();
    }
}
