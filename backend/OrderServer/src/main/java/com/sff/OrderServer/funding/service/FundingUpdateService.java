package com.sff.OrderServer.funding.service;

import com.sff.OrderServer.error.code.FundingError;
import com.sff.OrderServer.error.type.BaseException;
import com.sff.OrderServer.funding.entity.Funding;
import com.sff.OrderServer.funding.entity.FundingState;
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
            funding.updateState(FundingState.SUCCESS);
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
            funding.updateState(FundingState.FAILURE);
        }catch (Exception e){
            throw new BaseException(new ApiError(FundingError.UPDATE_FUNDINGSTATE_ERROR));
        }
    }

    @Transactional
    public void updateFundingOrderStateCancled(Long userId, Long fundingId){
        Funding funding = fundingRepository.findByFundingIdAndUserId(fundingId, userId).orElseThrow(
                ()-> new BaseException(new ApiError(FundingError.NOT_EXIST_FUNDING))
        );

        try{
            funding.updateState(FundingState.CANCEL);
        }catch(Exception e){
            throw new BaseException(new ApiError(FundingError.UPDATE_FUNDINGSTATE_ERROR));
        }
    }
}
