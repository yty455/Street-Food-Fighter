package com.sff.storeserver.domain.store.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sff.storeserver.common.error.code.StoreError;
import com.sff.storeserver.common.error.type.BaseException;
import com.sff.storeserver.domain.store.dto.StoreInfo;
import com.sff.storeserver.domain.store.dto.StoreInfoResponse;
import com.sff.storeserver.domain.store.dto.StoreUpdateCategory;
import com.sff.storeserver.domain.store.dto.StoreUpdateInfo;
import com.sff.storeserver.domain.store.entity.CategoryType;
import com.sff.storeserver.domain.store.entity.Store;
import com.sff.storeserver.domain.store.repository.StoreRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.geo.Point;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.support.KafkaHeaders;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.Date;
import java.util.List;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class StoreService {

    private final StoreRepository storeRepository;
    private final ObjectMapper objectMapper = new ObjectMapper();

    @KafkaListener(topics = "#{createStoreTopic.name}", groupId = "store-service-create")
    @Transactional
    public void consume(@Payload String storeInfo, @Header(KafkaHeaders.RECEIVED_PARTITION) int partition) throws IOException {
//        StoreInfo createStoreInfo = objectMapper.readValue(storeInfo, StoreInfo.class);
//        storeRepository.save(createStoreInfo.toEntity());
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

    public List<Store> getNearFlag(Date date, Point point, List<String> categories) {
        List<Store> nearbyFlags = storeRepository.findNearFlag(point, date);

        // 카테고리 필터링 (예: 선택한 카테고리에 속하는 가게만 선택)
        List<Store> filteredFlags = nearbyFlags
                .stream()
                .filter(store -> categories.contains(store.getCategory()))
                .toList();

        return filteredFlags;
    }

}
