package com.sff.PaymentServer.payment.repository;

import com.sff.PaymentServer.payment.entity.PaymentRecord;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRecordRepository extends JpaRepository<PaymentRecord, Long> {

}
