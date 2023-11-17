package com.sff.PaymentServer.payment.service;

import com.sff.PaymentServer.dto.FundingCreateRequest;
import com.sff.PaymentServer.dto.FundingCreateResponse;
import com.sff.PaymentServer.dto.PointUpdateRequest;
import com.sff.PaymentServer.error.code.NetworkError;
import com.sff.PaymentServer.error.code.PaymentError;
import com.sff.PaymentServer.error.type.BaseException;
import com.sff.PaymentServer.infra.OrderClient;
import com.sff.PaymentServer.infra.StoreClient;
import com.sff.PaymentServer.infra.UserClient;
import com.sff.PaymentServer.payment.entity.PaymentRecord;
import com.sff.PaymentServer.payment.entity.PaymentState;
import com.sff.PaymentServer.payment.repository.PaymentRecordRepository;
import com.sff.PaymentServer.utils.ApiError;
import com.sff.PaymentServer.utils.ApiResult;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class FundingPaymentService {
    private final PaymentRecordRepository paymentRecordRepository;
    private final OrderClient orderClient;
    private final UserClient userClient;
    private final StoreClient storeClient;

    @Transactional
    public void createFundingPayment(Long userId, FundingCreateRequest fundingCreateRequest){
        // 펀딩 정보 추가 - 상태 : 결제중
        FundingCreateResponse fundingCreateResponse = createFundingRecord(fundingCreateRequest);

        try {
            // 결제 (회원 포인트 차감)
            subtractUser(userId, fundingCreateResponse.getTotalPrice(),
                    fundingCreateRequest.getPaymentPassword());
            // 결제 정보 저장
            savePaymentRecord(userId, fundingCreateRequest.getStoreId(), fundingCreateResponse);

            // 펀딩 상태 변경 - 펀딩 대기 상태 + 바구니 상태 변경
            updateFundingState(fundingCreateResponse.getFundingId());
        }catch (BaseException e){
            // 펀딩 삭제
            orderClient.deleteFunding(fundingCreateResponse.getFundingId());
            throw new BaseException(e.getApiError());
        }
    }

    private FundingCreateResponse createFundingRecord(FundingCreateRequest fundingCreateRequest){
        ApiResult<FundingCreateResponse> result;
        try{
            result = orderClient.createFunding(fundingCreateRequest);
        }catch (Exception e){
            throw new BaseException(new ApiError(NetworkError.NETWORK_ERROR_ORDER));
        }

        if(result.getSuccess()==false) {
            throw new BaseException(result.getApiError());
        }
        return result.getResponse();
    }

    private void subtractUser(Long userId, Integer totalPrice, String paymentPassword){
        ApiResult result;
        try{
            result = userClient.updateUserPoint(userId, new PointUpdateRequest(totalPrice, false));
        }catch (Exception e){
            e.printStackTrace();
            throw new BaseException(new ApiError(NetworkError.NETWORK_ERROR_USER));
        }

        if(result.getSuccess()==false){
            throw new BaseException(result.getApiError());
        }
    }

    @Transactional
    private void savePaymentRecord(Long userId, Long storeId, FundingCreateResponse fundingCreateResponse){
        // paymentId, userId, ownerId, price, state, fundingId, orderId

        // storeId로 ownerId 찾기
        ApiResult<Long> result;
        try {
            result = storeClient.getOwnerId(storeId);
        }catch(Exception e){
            throw new BaseException(new ApiError(NetworkError.NETWORK_ERROR_STORE));
        }
        if(result.getSuccess()==false){
            throw new BaseException(result.getApiError());
        }
        Long ownerId = result.getResponse();

        // 결제 기록 저장
        PaymentRecord paymentRecord = PaymentRecord.builder()
                .paymentId(userId+"funding"+ fundingCreateResponse.getFundingId()) // 임시 : 회원ID + funding + fundingId
                .userId(userId)
                .ownerId(ownerId)
                .price(fundingCreateResponse.getTotalPrice())
                .state(PaymentState.FUNDING)
                .fundingId(fundingCreateResponse.getFundingId()).build();
        try {
            paymentRecordRepository.save(paymentRecord);
        }catch (Exception e){
            throw new BaseException(new ApiError(PaymentError.ERROR_SAVE_PAYEMNTRECORD));
        }
    }

    private void updateFundingState(Long fundingId){
        ApiResult result;
        try{
            result = orderClient.updateFundingWaiting(fundingId);
        }catch (Exception e){
            throw new BaseException(new ApiError(NetworkError.NETWORK_ERROR_ORDER));
        }

        if(result.getSuccess()==false){
            throw new BaseException(result.getApiError());
        }
    }
}
