package com.sff.storeserver.domain.store.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sff.storeserver.common.error.code.StoreError;
import com.sff.storeserver.common.error.type.BaseException;
import com.sff.storeserver.common.feignClient.OrderClient;
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
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.support.KafkaHeaders;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
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
    private final ObjectMapper objectMapper = new ObjectMapper();

    @KafkaListener(topics = "#{createStoreTopic.name}", groupId = "store-service-create")
    @Transactional
    public void create(@Payload String storeInfo, @Header(KafkaHeaders.RECEIVED_PARTITION) int partition) throws IOException {
        StoreInfo createStoreInfo = objectMapper.readValue(storeInfo, StoreInfo.class);
        storeRepository.save(createStoreInfo.toEntity());
        log.info("메시지입니다 : {}", storeInfo);
    }

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

    public List<StoreInfoResponse> getNearStore(double lati, double longi, List<CategoryType> categories) {
        List<Store> nearbyStores = storeRepository.findNearStore(lati, longi);

        // 카테고리 필터링 (예: 선택한 카테고리에 속하는 가게만 선택)
        return nearbyStores
                .stream()
                .filter(store -> categories.contains(store.getCategory()))
                .map(StoreInfoResponse::fromEntity)
                .toList();

    }

    public List<StoreInfoResponse> getNearFlag(LocalDate date, double lati, double longi, List<CategoryType> categories) {
        List<Store> nearbyFlags = storeRepository.findNearFlag(lati, longi, date);

        // 카테고리 필터링 (예: 선택한 카테고리에 속하는 가게만 선택)

        return nearbyFlags
                .stream()
                .filter(store -> categories.contains(store.getCategory()))
                .map(StoreInfoResponse::fromEntity)
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
    public void startBusiness(Long ownerId, Long flagId, double lati, double longi, String activeArea) {

        Store store = storeRepository.findByOwnerId(ownerId).orElseThrow(() ->
                new BaseException(StoreError.NOT_FOUND_STORE));

        // 깃발 선택 했으면 펀딩 성공!!!
        if (flagId != 0) {
            FlagNotificationInfo flagNotificationInfo = new FlagNotificationInfo();
            List<Flag> flags = flagRepository.findByStoreIdAndDate(store.getId(), LocalDate.now());
            flags.forEach(flag -> {
                if (flagId == flag.getId()) {
                    flag.fundingSuccess();
                    flagNotificationInfo.updatePicked(flag.getId());
                } else {
                    flag.fundingFailed();
                    flagNotificationInfo.updateUnpicked(flag.getId());
                }
            });

            // 깃발에 펀딩한 유저에게 알림 전송
            orderClient.notifyFlag(flagNotificationInfo);
        }
        store.startBusiness(lati, longi, activeArea);

    }

    @Transactional
    public void closeBusiness(Long ownerId) {

        Store store = storeRepository.findByOwnerId(ownerId).orElseThrow(() ->
                new BaseException(StoreError.NOT_FOUND_STORE));

        // TODO - 영업 종료 후 주문 서비스에 보내서 정산 금액 받기
        store.closeBusiness();

    }
}
