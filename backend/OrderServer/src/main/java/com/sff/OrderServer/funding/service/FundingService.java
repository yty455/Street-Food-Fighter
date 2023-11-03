package com.sff.OrderServer.funding.service;

import com.sff.OrderServer.bucket.dto.Option;
import com.sff.OrderServer.bucket.entity.Bucket;
import com.sff.OrderServer.bucket.entity.OrderMenu;
import com.sff.OrderServer.bucket.repository.BucketRepository;
import com.sff.OrderServer.bucket.repository.OrderMenuRepository;
import com.sff.OrderServer.error.code.BucketError;
import com.sff.OrderServer.error.code.FundingError;
import com.sff.OrderServer.error.type.BaseException;
import com.sff.OrderServer.funding.dto.FundingDetailResponse;
import com.sff.OrderServer.funding.dto.FundingItem;
import com.sff.OrderServer.funding.dto.FundingRequest;
import com.sff.OrderServer.funding.dto.FundingResponse;
import com.sff.OrderServer.funding.entity.Funding;
import com.sff.OrderServer.funding.repository.FundingRepository;
import com.sff.OrderServer.utils.ApiError;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class FundingService {
    private final FundingRepository fundingRepository;
    private final BucketRepository bucketRepository;
    private final OrderMenuRepository orderMenuRepository;

    // 펀딩 정보 저장 - 초기 상태 : 결제 중
    @Transactional
    public void createFunding(Long userId, FundingRequest fundingRequest){
        Bucket bucket = bucketRepository.findByBucketIdAndUserId(fundingRequest.getBucketId(), userId).orElseThrow(()->
                new BaseException(new ApiError(BucketError.NON_EXIST_BUCKET_USER)));
//        if(fundingRepository.findByBucket(bucket).isPresent()){
//            // 바구니와 펀딩은 1대1 관계인데 이미 바구니에 해당하는 펀딩 정보가 존재할 경우 예외 처리
//            // 이런 경우 결제 시 중복 요청의 가능성.
//            throw new BaseException(new ApiError(FundingError.EXIST_FUNDING_FOR_BUCKET));
//        }
        try{
            Funding funding = new Funding(bucket,fundingRequest, userId);
            fundingRepository.save(funding);
        }catch(Exception e){
            throw new BaseException(new ApiError(FundingError.FAIL_TO_CREATE_FUNDING));
        }
    }

    public List<FundingResponse> getFundings(Long userId){
        List<Funding> fundings = fundingRepository.findAllByUserId(userId);
        List<FundingResponse> fundingResponses = new ArrayList<>();
        for(Funding funding : fundings){
            Long storeId = funding.getStoreId();
            // storeId로 가게 이름, 이미지 URL 가져와야함.(MSA)
            String storeName = "temp";
            String storeUrl = "url";

            Bucket bucket = funding.getBucket();
            List<OrderMenu> menus = orderMenuRepository.findAllByBucket(bucket);
            OrderMenu menu = menus.get(0);
            Integer restCount = menus.size()-1;

            fundingResponses.add(new FundingResponse(funding, storeName, storeUrl, bucket.getTotalPrice(), menu, restCount));
        }
        return fundingResponses;
    }

    public FundingDetailResponse getFunding(Long userId, Long fundingId){
        Funding funding = fundingRepository.findByFundingIdAndUserId(fundingId, userId).orElseThrow(
                ()->new BaseException(new ApiError(FundingError.NOT_EXIST_FUNDING)));

        // funding의 storeId로 storeName, storeUrl (MSA)
        // funding의 flagId로 flagAddress, flagDate (MSA)
        String storeName = "가게 이름";
        String storeUrl = "URL";
        String flagAddress = "깃발 주소";
        LocalDateTime flagDate = LocalDateTime.now();

        Bucket bucket = funding.getBucket();
        List<FundingItem> fundingItems = getFundingItems(orderMenuRepository.findAllByBucket(bucket));

        return FundingDetailResponse.builder()
                .state(funding.getFundingState())
                .orderState(funding.getOrderState())
                .storeId(funding.getStoreId())
                .storeName(storeName)
                .storeUrl(storeUrl)
                .flagAddress(flagAddress)
                .flagDate(flagDate)
                .createAt(funding.getCreatedAt())
                .requirement(funding.getRequirement())
                .fundingItemList(fundingItems)
                .totalPrice(bucket.getTotalPrice()).build();
    }

    private List<FundingItem> getFundingItems(List<OrderMenu> orderMenus){
        try {
            return orderMenus.stream().map(orderMenu -> {
                        List<Option> options = orderMenu.getOptions().stream().map(Option::new)
                                .collect(Collectors.toList());
                        int optionsTotalPrice = 0;
                        for (Option option : options)
                            optionsTotalPrice += option.getPrice();
                        int total = (orderMenu.getPrice() + optionsTotalPrice) * orderMenu.getCount();
                        return new FundingItem(orderMenu, options, total);
                    })
                    .collect(Collectors.toList());
        }catch (Exception e){
            throw new BaseException(new ApiError(FundingError.CREATE_FUNDINGITEM_LIST));
        }
    }

    // funding state 변경
    @Transactional
    public void updateFundingStateWaiting(Long userId, Long fundingId){
        Funding funding = fundingRepository.findByFundingIdAndUserId(fundingId, userId).orElseThrow(
                ()-> new BaseException(new ApiError(FundingError.NOT_EXIST_FUNDING))
        );
        // 결제 완료에 따른 펀딩 대기 상태로 변경
        try {
            funding.updateFundingStateWaitting();
        }catch (Exception e){
            throw new BaseException(new ApiError(FundingError.UPDATE_FUNDINGSTATE_ERROR));
        }

        // 바구니 결제 상태 true로 변경
        try{
            funding.getBucket().updateState();
        }catch(Exception e){
            throw new BaseException(new ApiError(BucketError.UPDATE_BUCKET_STATE_ERROR));
        }
    }
    @Transactional
    public void updateFundingStateSuccess(Long userId, Long fundingId){
        Funding funding = fundingRepository.findByFundingIdAndUserId(fundingId, userId).orElseThrow(
                ()-> new BaseException(new ApiError(FundingError.NOT_EXIST_FUNDING))
        );
        try {
            funding.updateFundingStateSuccess();
        }catch (Exception e){
            throw new BaseException(new ApiError(FundingError.UPDATE_FUNDINGSTATE_ERROR));
        }
    }
    @Transactional
    public void updateFundingStateFailure(Long userId, Long fundingId){
        Funding funding = fundingRepository.findByFundingIdAndUserId(fundingId, userId).orElseThrow(
                ()-> new BaseException(new ApiError(FundingError.NOT_EXIST_FUNDING))
        );
        try {
            funding.updateFundingStateFailure();
        }catch (Exception e){
            throw new BaseException(new ApiError(FundingError.UPDATE_FUNDINGSTATE_ERROR));
        }
        updateFundingOrderStateFailed(userId, fundingId); // 펀딩 실패에 따른 주문 상태 - 실패 변경
    }

    // funding orderState 변경
    @Transactional
    public void updateFundingOrderStateBefore(Long userId, Long fundingId){
        Funding funding = fundingRepository.findByFundingIdAndUserId(fundingId, userId).orElseThrow(
                ()-> new BaseException(new ApiError(FundingError.NOT_EXIST_FUNDING))
        );
        try{
            funding.updateOrderStateBefore();
        }catch(Exception e){
            throw new BaseException(new ApiError(FundingError.UPDATE_FUNDING_ORDERSTATE_ERROR));
        }
    }
    @Transactional
    public void updateFundingOrderStateComplete(Long userId, Long fundingId){
        Funding funding = fundingRepository.findByFundingIdAndUserId(fundingId, userId).orElseThrow(
                ()-> new BaseException(new ApiError(FundingError.NOT_EXIST_FUNDING))
        );
        try {
            funding.updateOrderStateComplete();
        }catch(Exception e){
            throw new BaseException(new ApiError(FundingError.UPDATE_FUNDING_ORDERSTATE_ERROR));
        }
    }
    @Transactional
    public void updateFundingOrderStateCancled(Long userId, Long fundingId){
        Funding funding = fundingRepository.findByFundingIdAndUserId(fundingId, userId).orElseThrow(
                ()-> new BaseException(new ApiError(FundingError.NOT_EXIST_FUNDING))
        );
        try{
            funding.updateOrderStateCancled();
        }catch(Exception e){
            throw new BaseException(new ApiError(FundingError.UPDATE_FUNDING_ORDERSTATE_ERROR));
        }
    }
    @Transactional
    public void updateFundingOrderStateFailed(Long userId, Long fundingId){
        Funding funding = fundingRepository.findByFundingIdAndUserId(fundingId, userId).orElseThrow(
                ()-> new BaseException(new ApiError(FundingError.NOT_EXIST_FUNDING))
        );
        try{
            funding.updateOrderStateFailed();
        }catch(Exception e){
            throw new BaseException(new ApiError(FundingError.UPDATE_FUNDING_ORDERSTATE_ERROR));
        }
    }
}
