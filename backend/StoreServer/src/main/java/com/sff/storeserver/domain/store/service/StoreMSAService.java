package com.sff.storeserver.domain.store.service;

import com.sff.storeserver.domain.flag.dto.FlagMSAResponse;
import com.sff.storeserver.domain.flag.repository.FlagRepository;
import com.sff.storeserver.domain.review.dto.ReviewMSAResponse;
import com.sff.storeserver.domain.review.repository.ReviewRepository;
import com.sff.storeserver.domain.store.dto.StoreMSAResponse;
import com.sff.storeserver.domain.store.repository.StoreRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class StoreMSAService {

    private final StoreRepository storeRepository;
    private final FlagRepository flagRepository;
    private final ReviewRepository reviewRepository;


    public List<StoreMSAResponse> getStores(List<Long> storeList) {
        return storeRepository.findAllByIdIn(storeList).stream().map(StoreMSAResponse::fromEntity).toList();
    }

    public ReviewMSAResponse getReview(Long orderId) {
        return ReviewMSAResponse.fromEntity(reviewRepository.findByOrderId(orderId));
    }


    public FlagMSAResponse getFlag(Long flagId) {
        return flagRepository.getFlagById(flagId);
    }

}
