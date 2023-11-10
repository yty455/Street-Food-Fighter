package com.sff.PaymentServer.payment.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sff.PaymentServer.dto.FundingChosen;
import com.sff.PaymentServer.dto.NotificationType;
import com.sff.PaymentServer.dto.PurposeCreateRequest;
import com.sff.PaymentServer.dto.UserInfo;
import com.sff.PaymentServer.dto.UserNotificationInfo;
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
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class RefundService {
    private final PaymentRecordRepository paymentRecordRepository;
    private final OrderClient orderClient;
    private final UserClient userClient;

    private final ObjectMapper objectMapper = new ObjectMapper();
    private final KafkaTemplate<String, String> kafkaTemplate;

    // 사장의 주문 접수 거절에 따른 화불 처리
    public void refundFromReject(Long orderId){
        PaymentRecord paymentRecord = paymentRecordRepository.findByOrderId(orderId).orElseThrow(
                ()->new BaseException(new ApiError(PaymentError.NOT_EXIST_PAYMENTRECORD)));
        // 환불
        refund(paymentRecord);

        // 결제 상태 변경
        updatePaymentRecordState(paymentRecord, PaymentState.REFUND);

        // 주문 상태 변경
        Long storeId = updateOrderStateRefused(orderId);

        // 주문 거절 알림
        sendNotificationToUser(storeId, paymentRecord);

    }

    private void refund(PaymentRecord paymentRecord){
        ApiResult result;
        try{
            result = userClient.updateUserPoint(paymentRecord.getUserId(), new PurposeCreateRequest(
                    paymentRecord.getPrice(), true));
        }catch (Exception e){
            throw new BaseException(new ApiError(NetworkError.NETWORK_ERROR_USER));
        }

        if(result.getSuccess()==false){
            throw new BaseException(result.getApiError());
        }
    }

    @Transactional
    private void updatePaymentRecordState(PaymentRecord paymentRecord, PaymentState paymentState){
        try{
            paymentRecord.updateState(paymentState);
        }catch (Exception e){
            throw new BaseException(new ApiError(PaymentError.ERROR_PAYMENT_STATE_CHANGE));
        }
    }

    private Long updateOrderStateRefused(Long orderId){
        ApiResult<Long> result;
        try{
            result = orderClient.updateOrderStateRefused(orderId);
        }catch (Exception e){
            throw new BaseException(new ApiError(NetworkError.NETWORK_ERROR_ORDER));
        }

        if(result.getSuccess()==false){
            throw new BaseException(result.getApiError());
        }
        return result.getResponse();
    }

    private void sendNotificationToUser(Long storeId, PaymentRecord paymentRecord){
        UserInfo userInfo = new UserInfo(paymentRecord);
        List<UserInfo> userInfoList = new ArrayList<>();
        userInfoList.add(userInfo);
        UserNotificationInfo userNotificationInfo = UserNotificationInfo.builder()
                .storeId(storeId).type(NotificationType.REFUSED)
                .storeName("").userList(userInfoList).build();
        // 객체를 JSON 문자열로 직렬화
        try {
            String notificationInfoJson = objectMapper.writeValueAsString(userNotificationInfo);
            kafkaTemplate.send("notification-service-notify-user", notificationInfoJson);
        }catch (JsonProcessingException e) {
            throw new BaseException(new ApiError(PaymentError.SERIAL_ERROR));
        }catch(Exception e){
            throw new BaseException(new ApiError(PaymentError.ERROR_NOTIFICATION_REQUEST));
        }
    }

    // -----------------------------------
    // 미선택 깃발 리스트의 환불 처리 및 펀딩 상태 변경 + 알림 요청 처리
    public void updateUnpickedFundingsRefundAndAllFlagsState(FundingChosen fundingChosen){

    }

}
