package com.sff.OrderServer.funding.service;

import com.sff.OrderServer.bucket.entity.Bucket;
import com.sff.OrderServer.bucket.repository.BucketRepository;
import com.sff.OrderServer.error.code.BucketError;
import com.sff.OrderServer.error.type.BaseException;
import com.sff.OrderServer.funding.dto.FundingRequest;
import com.sff.OrderServer.funding.entity.Funding;
import com.sff.OrderServer.funding.repository.FundingRepository;
import com.sff.OrderServer.utils.ApiError;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class FundingService {
    private final FundingRepository fundingRepository;
    private final BucketRepository bucketRepository;

    @Transactional
    public void createFunding(Long userId, FundingRequest fundingRequest){
        Bucket bucket = bucketRepository.findByBucketIdAndUserId(fundingRequest.getBucketId(), userId).orElseThrow(()->
                new BaseException(new ApiError(BucketError.NON_EXIST_BUCKET_USER)));
        Funding funding = new Funding(bucket,fundingRequest, userId);
        fundingRepository.save(funding);


    }

}
