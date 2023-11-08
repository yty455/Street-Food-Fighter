package com.sff.storeserver.domain.review.service;

import com.sff.storeserver.common.error.type.BaseException;
import com.sff.storeserver.common.feignClient.OrderClient;
import com.sff.storeserver.common.feignClient.UserClient;
import com.sff.storeserver.common.utils.ApiResult;
import com.sff.storeserver.domain.review.dto.*;
import com.sff.storeserver.domain.review.repository.ReviewRepository;
import com.sff.storeserver.domain.store.entity.Store;
import com.sff.storeserver.domain.store.repository.StoreRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ReviewService {
    private final ReviewRepository reviewRepository;
    private final StoreRepository storeRepository;

    private final UserClient userClient;
    private final OrderClient orderClient;

    @Transactional
    public void createReview(ReviewRequest reviewRequest) {

        // 주문 아이디 -> 주문 서비스에 보내서 가게 아이디 받아오기 (Long)
        Long storeId = orderClient.getStoreId(reviewRequest.getOrderId()).getResponse();

        Store store = storeRepository.findById(storeId)
                .orElseThrow(BaseException::new);

        reviewRepository.save(reviewRequest.toEntity(store));
    }

    public Page<MyReviewResponse> getMyReviews(Long userId, int page, int size) {

        PageRequest pageRequest = PageRequest.of(page, size, Sort.by("createdDate").descending());

        Page<MyReviewResponse> myReviewResponseList = reviewRepository.findByUserId(userId, pageRequest);

        // 주문 아이디 리스트 -> 주문 서비스에 보내서 주문 메뉴 받아오기 (List<String>)
        List<ReviewMenuInfo> reviewMenuInfos = orderClient.getMenus(myReviewResponseList.getContent().stream().map(MyReviewResponse::getOrderId).toList()).getResponse();
        // 합쳐서 내려주기
        for (int idx = 0; idx < reviewMenuInfos.size(); idx++) {
            myReviewResponseList.getContent().get(idx).updateMenu(reviewMenuInfos.get(idx).getMenuList());
        }
        return myReviewResponseList;

    }

    public Slice<StoreReviewResponse> getStoreReviews(Long storeId, int page, int size) {

        PageRequest pageRequest = PageRequest.of(page, size, Sort.by("createdDate").descending());

        Slice<StoreReviewResponse> storeReviewResponseList = reviewRepository.findByStoreId(storeId, pageRequest);

        // 유저 아이디 리스트 -> 회원 서비스에 보내서 s회원 정보 받아오기 (userName, userProfileUrl)
        ApiResult<List<ReviewUserInfo>> userInfo = userClient.getUserInfo(ReviewUserInfoRequest.builder().memberIds(storeReviewResponseList.getContent().stream().map(StoreReviewResponse::getUserId).toList()).build());
        // 합쳐서 내려주기
        for (int idx = 0; idx < storeReviewResponseList.getContent().size(); idx++) {
            storeReviewResponseList.getContent().get(idx).updateUserInfo(userInfo.getResponse().get(idx).getNickname(), userInfo.getResponse().get(idx).getImageUrl());
        }
        return storeReviewResponseList;
    }
}