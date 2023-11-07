package com.sff.PaymentServer.payment.service;

import com.fasterxml.jackson.databind.ser.Serializers.Base;
import com.sff.PaymentServer.error.code.NetworkError;
import com.sff.PaymentServer.error.code.PaymentError;
import com.sff.PaymentServer.error.type.BaseException;
import com.sff.PaymentServer.infra.OrderClient;
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
public class OrderFromFundingService {
    private final PaymentRecordRepository paymentRecordRepository;
    private final OrderClient orderClient;

    public void orderFromFunding(Long userId, Long fundingId){
        // 주문 정보 추가 - 펀딩 id 로부터
        createOrderRecord(fundingId);

        // 결제 상태 변경
        updatePaymentState(fundingId);

        // 주문 상태 변경 - 주문 성공 + 펀딩 주문 상태 변경


        // 주문 접수 대기 알림(to 사장)


    }

    private void createOrderRecord(Long fundingId){
        ApiResult result;
        try{
            result = orderClient.createOrderRecordFromFunding(fundingId);
        }catch (Exception e){
            throw new BaseException(new ApiError(NetworkError.NETWORK_ERROR_ORDER));
        }

        if(result.getSuccess()==false){
            throw new BaseException(result.getApiError());
        }
    }

    @Transactional
    private void updatePaymentState(Long fundingId){
        PaymentRecord paymentRecord = paymentRecordRepository.findByFundingId(fundingId).orElseThrow(
                ()->new BaseException(new ApiError(PaymentError.NOT_EXIST_PAYMENTRECORD)));

        try{
            paymentRecord.updateState(PaymentState.ORDER);
        }catch (Exception e){
            new BaseException(new ApiError(PaymentError.ERROR_PAYMENT_STATE_CHANGE));
        }
    }

    private void updateOrderState(){

    }
}
