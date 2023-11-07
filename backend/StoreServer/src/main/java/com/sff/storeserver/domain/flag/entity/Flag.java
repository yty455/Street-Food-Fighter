package com.sff.storeserver.domain.flag.entity;

import com.sff.storeserver.common.BaseEntity;
import com.sff.storeserver.domain.store.entity.Store;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Where;

import java.time.LocalDate;
import java.time.LocalTime;

import static jakarta.persistence.FetchType.LAZY;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder(toBuilder = true)
@Where(clause = "status = 'ACTIVE'")
public class Flag extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "FLAG_ID")
    private Long id;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "STORE_ID")
    private Store store;
    private LocalDate date;
    private LocalTime openTime;
    private LocalTime closeTime;
    private String address;

    private double lati;
    private double longi;

    @Enumerated(EnumType.STRING)
    private FlagType state;

    public void delete() {
        this.deleteStatus();
    }

    public void fundingFailed() {
        this.state = FlagType.FAILURE;
    }

    public void fundingSuccess() {
        this.state = FlagType.SUCCESS;
    }
}
