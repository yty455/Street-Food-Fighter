package com.sff.PaymentServer.payment.service;

import com.sff.PaymentServer.dto.OrderFromFundingResponse;
import com.sff.PaymentServer.dto.PointUpdateRequest;
import com.sff.PaymentServer.error.code.NetworkError;
import com.sff.PaymentServer.error.code.PaymentError;
import com.sff.PaymentServer.error.type.BaseException;
import com.sff.PaymentServer.infra.OrderClient;
import com.sff.PaymentServer.infra.UserClient;
import com.sff.PaymentServer.payment.entity.PaymentRecord;
import com.sff.PaymentServer.payment.entity.PaymentState;
import com.sff.PaymentServer.payment.repository.PaymentRecordRepository;
import com.sff.PaymentServer.utils.ApiError;
import com.sff.PaymentServer.utils.ApiResult;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class OrderFromFundingService {
    private final PaymentRecordRepository paymentRecordRepository;
    private final OrderClient orderClient;
    private final UserClient userClient;

    private final KafkaTemplate<String, String> kafkaTemplate;

    @Transactional
    public void orderFromFunding(Long fundingId){
        // 주문 정보 추가 - 펀딩 id 로부터
        OrderFromFundingResponse orderFromFundingResponse = createOrderRecord(fundingId);

        // 결제 상태 변경
        updatePaymentState(fundingId, orderFromFundingResponse.getOrderId());

        // 주문 상태 변경 - 주문 성공 + 펀딩 주문 상태 변경
        updateOrderState(fundingId, orderFromFundingResponse.getOrderId());

        // 주문 접수 대기 알림(to 사장)
        sendNotificationToOwner(orderFromFundingResponse.getStoreId());

    }

    private OrderFromFundingResponse createOrderRecord(Long fundingId){
        ApiResult<OrderFromFundingResponse> result;
        try{
            result = orderClient.createOrderRecordFromFunding(fundingId);
        }catch (Exception e){
            throw new BaseException(new ApiError(NetworkError.NETWORK_ERROR_ORDER));
        }

        if(result.getSuccess()==false){
            throw new BaseException(result.getApiError());
        }

        return result.getResponse();
    }

    @Transactional
    private void updatePaymentState(Long fundingId, Long orderId){
        PaymentRecord paymentRecord = paymentRecordRepository.findByFundingId(fundingId).orElseThrow(
                ()->new BaseException(new ApiError(PaymentError.NOT_EXIST_PAYMENTRECORD)));
        try{
            paymentRecord.updateState(PaymentState.ORDER);
            paymentRecord.updateOrderId(orderId);
        }catch (Exception e){
            new BaseException(new ApiError(PaymentError.ERROR_PAYMENT_STATE_CHANGE));
        }
    }

    private void updateOrderState(Long fundingId, Long orderId){
        ApiResult result;
        try {
            result = orderClient.updateFundingAndOrderState(fundingId, orderId);
        }catch (Exception e){
            throw new BaseException(new ApiError(NetworkError.NETWORK_ERROR_ORDER));
        }

        if(result.getSuccess()==false){
            throw new BaseException(result.getApiError());
        }
    }

    private void sendNotificationToOwner(Long storeId){
        try {
            kafkaTemplate.send("notification-service-notify-store", String.valueOf(storeId));
        }catch (Exception e){
            throw new BaseException(new ApiError(PaymentError.ERROR_NOTIFICATION_REQUEST));
        }
    }

    // -----------------------------------------
    // 주문 취소 - 회원 주체
    @Transactional
    public void cancelFromFunding(Long fundingId){
        PaymentRecord paymentRecord = paymentRecordRepository.findByFundingId(fundingId).orElseThrow(
                ()->new BaseException(new ApiError(PaymentError.NOT_EXIST_PAYMENTRECORD)));
        // 환불 (회원 포인트 추가) - 90% 환불
        refundToUser(paymentRecord);

        // 결제 상태 변경(상태 변경 + 시간 저장)
        updatePaymentState(paymentRecord);

        // 펀딩 주문 상태 변경 (CANCLED) + 펀딩 상태 변경
        updateFundingState(paymentRecord.getFundingId());

    }

    private void refundToUser(PaymentRecord paymentRecord){
        Long userId = paymentRecord.getUserId();
        Integer price = paymentRecord.getPrice();

        ApiResult result;
        try {
            result = userClient.updateUserPoint(userId,
                    new PointUpdateRequest((int) Math.floor(price * 0.9), true));
        }catch(Exception e){
            throw new BaseException(new ApiError(NetworkError.NETWORK_ERROR_USER));
        }

        if(result.getSuccess()==false){
            throw new BaseException(result.getApiError());
        }
    }

    @Transactional
    private void updatePaymentState(PaymentRecord paymentRecord){
        try{
            paymentRecord.updateState(PaymentState.REFUND);
        }catch (BaseException e){
            throw new BaseException(new ApiError(PaymentError.ERROR_PAYMENT_STATE_CHANGE));
        }
    }

    private void updateFundingState(Long fundingId){
        ApiResult result;
        try{
            result = orderClient.updateFundingCancel(fundingId);
        }catch (Exception e){
            throw new BaseException(new ApiError(NetworkError.NETWORK_ERROR_ORDER));
        }

        if(result.getSuccess()==false){
            throw new BaseException(result.getApiError());
        }
    }


}
