package com.sff.PaymentServer.payment.service;

import com.sff.PaymentServer.dto.OrderCreateRequest;
import com.sff.PaymentServer.dto.OrderCreateResponse;
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
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class OrderPaymentService {
    private final PaymentRecordRepository paymentRecordRepository;
    private final OrderClient orderClient;
    private final UserClient userClient;
    private final StoreClient storeClient;

    private final KafkaTemplate<String, String> kafkaTemplate;

    @Transactional
    public void createOrderPayment(Long userId, OrderCreateRequest orderCreateRequest){
        // 주문 정보 추가 -> OrderServer
        OrderCreateResponse orderCreateResponse = createOrderRecord(orderCreateRequest);

        // 회원 포인트 차감 -> UserServer
        subtractUser(userId, orderCreateResponse.getTotalPrice());

        // 결제 정보 저장
        savePaymentRecord(userId, orderCreateRequest.getStoreId(), orderCreateResponse);

        // 주문 정보 변경 - 주문 성공 + 바구니 상태 변경 -> OrderServer
        updateOrderState(orderCreateResponse.getOrderId());

        // 주문 접수 대기 알림(to 사장) -> NotificationServer
        sendNotificationToOwner(orderCreateRequest.getStoreId());
    }

    // 총액을 알아내는 것과 주문 정보 저장 동작을 한 번의 요청으로 할지 분리할지 고민.
    private OrderCreateResponse createOrderRecord(OrderCreateRequest orderCreateRequest){
        ApiResult<OrderCreateResponse> result;
        try{
            result = orderClient.createOrderRecord(orderCreateRequest);
        }catch (Exception e){
            throw new BaseException(new ApiError(NetworkError.NETWORK_ERROR_ORDER));
        }

        if(result.getSuccess()==false) {
            throw new BaseException(result.getApiError());
        }
        return result.getResponse();
    }

    private void subtractUser(Long userId, Integer totalPrice){
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
    private void savePaymentRecord(Long userId, Long storeId, OrderCreateResponse orderCreateResponse){
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
                .paymentId(userId+"order"+ orderCreateResponse.getOrderId()) // 임시 : 회원ID + order + orderId
                .userId(userId)
                .ownerId(ownerId)
                .price(orderCreateResponse.getTotalPrice())
                .state(PaymentState.ORDER)
                .orderId(orderCreateResponse.getOrderId()).build();
        try {
            paymentRecordRepository.save(paymentRecord);
        }catch (Exception e){
            throw new BaseException(new ApiError(PaymentError.ERROR_SAVE_PAYEMNTRECORD));
        }
    }

    private void updateOrderState(Long orderId){
        ApiResult result;
        try{
            result = orderClient.updateOrderState(orderId);
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
}
