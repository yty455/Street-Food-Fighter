package com.sff.storeserver.domain.flag.entity;

import com.sff.storeserver.domain.store.entity.Store;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.geo.Point;

import java.time.LocalDate;
import java.time.LocalTime;

import static jakarta.persistence.FetchType.LAZY;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder(toBuilder = true)
public class Flag {
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
    private int fundraising_amount;
    private String address;
    private Point areaPoint;
    private String state;
}
