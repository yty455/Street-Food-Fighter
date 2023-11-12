package com.sff.PaymentServer.payment.service;

import com.sff.PaymentServer.dto.PointUpdateRequest;
import com.sff.PaymentServer.error.code.NetworkError;
import com.sff.PaymentServer.error.code.PaymentError;
import com.sff.PaymentServer.error.type.BaseException;
import com.sff.PaymentServer.infra.OwnerClient;
import com.sff.PaymentServer.payment.entity.PaymentRecord;
import com.sff.PaymentServer.payment.entity.PaymentState;
import com.sff.PaymentServer.payment.repository.PaymentRecordRepository;
import com.sff.PaymentServer.utils.ApiError;
import com.sff.PaymentServer.utils.ApiResult;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CalculateService {
    private final PaymentRecordRepository paymentRecordRepository;
    private final OwnerClient ownerClient;

    @Transactional
    public void calculatePayment(Long ownerId){
        System.out.println(1);
        List<PaymentRecord> paymentRecords = paymentRecordRepository.findAllByOwnerIdAndState(ownerId, PaymentState.ORDER);
        System.out.println(2);
        // 정산 포인트 사장 포인트에 추가
        System.out.println("ownerId : "+ownerId);
        updateOwnerPoint(ownerId, paymentRecords);
        System.out.println(3);
        // 결제 상태 정산으로 변경
        updatePaymentState(paymentRecords);
        System.out.println(4);
    }

    private void updateOwnerPoint(Long ownerId, List<PaymentRecord> paymentRecords){
        Integer total = 0;
        for(PaymentRecord paymentRecord: paymentRecords){
            total+=paymentRecord.getPrice();
        }

        ApiResult result;
        try{
            result = ownerClient.updateOwnerPoint(ownerId, new PointUpdateRequest(total, true));
        }catch (Exception e){
            throw new BaseException(new ApiError(NetworkError.NETWORK_ERROR_OWNER));
        }
        if(result.getSuccess()==false){
            throw new BaseException(result.getApiError());
        }
    }

    @Transactional
    private void updatePaymentState(List<PaymentRecord> paymentRecords){
        try {
            for (PaymentRecord paymentRecord : paymentRecords) {
                paymentRecord.updateState(PaymentState.CALCULATE);
            }
            paymentRecordRepository.saveAll(paymentRecords);
        }catch (Exception e){
            throw new BaseException(new ApiError(PaymentError.ERROR_PAYMENT_STATE_CHANGE));
        }
    }
}
