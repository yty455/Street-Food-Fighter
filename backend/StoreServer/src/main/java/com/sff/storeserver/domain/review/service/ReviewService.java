package com.sff.storeserver.domain.review.service;

import com.sff.storeserver.common.error.code.StoreError;
import com.sff.storeserver.common.error.type.BaseException;
import com.sff.storeserver.common.feignClient.NotiClient;
import com.sff.storeserver.common.feignClient.OrderClient;
import com.sff.storeserver.common.feignClient.UserClient;
import com.sff.storeserver.common.utils.ApiError;
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
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ReviewService {
    private final ReviewRepository reviewRepository;
    private final StoreRepository storeRepository;

    private final UserClient userClient;
    private final OrderClient orderClient;
    private final NotiClient notiClient;

    @Transactional
    public void createReview(ReviewRequest reviewRequest, Long userId) {

        // 주문 아이디 -> 주문 서비스에 보내서 가게 아이디 받아오기 (Long)
        Long storeId = orderClient.getStoreId(reviewRequest.getOrderId()).getResponse();

        Store store = storeRepository.findById(storeId)
                .orElseThrow(() -> (new BaseException(StoreError.NOT_FOUND_STORE)));

        reviewRepository.save(reviewRequest.toEntity(store, userId));

        // 알림 서버로 업데이트 보내기
        notiClient.updateType(NotificationUpdateRequest.builder().targetId(reviewRequest.getOrderId()).type("DONE_R").build());
    }

    public Page<MyReviewResponse> getMyReviews(Long userId, int page, int size) {

        PageRequest pageRequest = PageRequest.of(page, size, Sort.by("createdDate").descending());

        Page<MyReviewResponse> myReviewResponseList = reviewRepository.findByUserId(userId, pageRequest);

        // 주문 아이디 리스트 -> 주문 서비스에 보내서 주문 메뉴 받아오기 (List<String>)
        ApiResult<List<ReviewMenuInfo>> result;
        try {
            List<Long> orders = myReviewResponseList.getContent().stream().map(MyReviewResponse::getOrderId).toList();
            result = orderClient.getMenus(orders);
        } catch (Exception e) {
            throw new BaseException(new ApiError("주문서버와 통신 에러", 1));
        }
        if (!result.getSuccess()) {
            throw new BaseException(result.getApiError());
        }

        List<ReviewMenuInfo> reviewMenuInfos = result.getResponse();
        // 합쳐서 내려주기
        for (int idx = 0; idx < reviewMenuInfos.size(); idx++) {
            myReviewResponseList.getContent().get(idx).updateMenu(reviewMenuInfos.get(idx).getMenuList());
        }
        return myReviewResponseList;

    }

    public Slice<StoreReviewResponse> getStoreReviews(Long storeId, int page, int size) {

        PageRequest pageRequest = PageRequest.of(page, size, Sort.by("createdDate").descending());

        Slice<StoreReviewResponse> storeReviewResponseList = reviewRepository.findByStoreId(storeId, pageRequest);

        // 유저 아이디 리스트 -> 회원 서비스에 보내서 회원 정보 받아오기 (userName, userProfileUrl)
        ApiResult<List<ReviewUserInfo>> result;
        try {
            result = userClient.getUserInfo(ReviewUserInfoRequest.builder().memberIds(storeReviewResponseList.getContent().stream().map(StoreReviewResponse::getUserId).toList()).build());
        } catch (Exception e) {
            throw new BaseException(new ApiError("회원서버와 통신 에러", 1));
        }
        if (!result.getSuccess()) {
            throw new BaseException(result.getApiError());
        }

        List<ReviewUserInfo> userInfoList = result.getResponse();
        Map<Long, ReviewUserInfo> userInfoMap = userInfoList.stream().collect(Collectors.toMap(ReviewUserInfo::getUserId, reviewUserInfo -> reviewUserInfo));
        // 합쳐서 내려주기
        for (int idx = 0; idx < storeReviewResponseList.getContent().size(); idx++) {
            storeReviewResponseList.getContent().get(idx).updateUserInfo(userInfoMap.get(storeReviewResponseList.getContent().get(idx).getUserId()).getNickname(), userInfoMap.get(storeReviewResponseList.getContent().get(idx).getUserId()).getImageUrl());
        }
        return storeReviewResponseList;
    }
}
