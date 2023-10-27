package com.sff.storeserver.domain.store;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.geo.Point;

import java.time.LocalDateTime;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder(toBuilder = true)
public class Store {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "STORE_ID")
    private Long id;

    private Long ownerId;
    private String name;
    private String ownerName;
    private String phone;
    private String businessCategory;
    private String information;
    private String introduction;
    private LocalDateTime openTime;
    private LocalDateTime closeTime;
    private String activeArea;
    private Point areaPoint;
    private String storeUrl;
    private String state;

}
