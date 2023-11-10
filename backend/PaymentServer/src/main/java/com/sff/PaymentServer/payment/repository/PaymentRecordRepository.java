package com.sff.PaymentServer.payment.repository;

import com.sff.PaymentServer.payment.entity.PaymentRecord;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRecordRepository extends JpaRepository<PaymentRecord, Long> {
    Optional<PaymentRecord> findByFundingId(Long fundingId);
    Optional<PaymentRecord> findByOrderId(Long orderId);
}
