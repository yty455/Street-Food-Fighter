package com.sff.storeserver.domain.flag;

import com.sff.storeserver.domain.store.Store;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.geo.Point;

import java.time.LocalDate;
import java.time.LocalDateTime;

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
    private LocalDateTime openTime;
    private LocalDateTime closeTime;
    private int fundraising_amount;
    private String address;
    private Point areaPoint;
    private String state;
}
