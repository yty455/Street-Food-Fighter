package com.sff.OrderServer.funding.service;

import com.sff.OrderServer.error.code.BucketError;
import com.sff.OrderServer.error.code.FundingError;
import com.sff.OrderServer.error.type.BaseException;
import com.sff.OrderServer.funding.entity.Funding;
import com.sff.OrderServer.funding.repository.FundingRepository;
import com.sff.OrderServer.utils.ApiError;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class FundingUpdateService {
    private final FundingRepository fundingRepository;


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
