package com.sff.storeserver.domain.store.service;

import com.sff.storeserver.domain.store.Store;
import com.sff.storeserver.domain.store.dto.StoreInfo;
import com.sff.storeserver.domain.store.dto.StoreInfoResponse;
import com.sff.storeserver.domain.store.repository.StoreRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.geo.Point;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class StoreService {

    private final StoreRepository storeRepository;

    @Transactional
    public void registerStore(StoreInfo storeInfo) {
        storeRepository.save(storeInfo.toEntity());
    }

    public StoreInfoResponse getStore(Long ownerId) {
        return StoreInfoResponse.fromEntity(storeRepository.findByOwnerId(ownerId));
    }

    public void modifyStore(StoreInfo storeInfo) {
        Store store = storeRepository.findByOwnerId(storeInfo.getOwnerId());
        store.update(storeInfo);
    }

    public void getNearStore(Point point, List<String> categories) {
        Store store = storeRepository.findNearStore(point, categories);
    }

    public void getNearFlag(Date date, Point point, List<String> categories) {
        Store store = storeRepository.findNearFlag(date, point, categories);
    }


}
