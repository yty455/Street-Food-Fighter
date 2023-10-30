package com.sff.storeserver.domain.store.entity;

import com.sff.storeserver.domain.store.dto.StoreInfo;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.function.Consumer;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder(toBuilder = true)
public class Store implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "STORE_ID")
    private Long id;

    private Long ownerId;
    private String name;
    private String ownerName;
    private String phone;
    private String category;
    private String businessCategory;
    private String information;
    private String introduction;
    private LocalDateTime openTime;
    private LocalDateTime closeTime;
    private String activeArea;

    //    @Column(columnDefinition = "geometry(Point, 4326)")
//    @Column(columnDefinition = "POINT")
//    private Point areaPoint;
    private double lati;
    private double longi;
    private String storeUrl;
    private String state;

    public void update(StoreInfo storeInfo) {
        updateName(storeInfo.getName());

    }

    private <T> void updateIfNotNull(Consumer<T> updater, T newValue) {
        if (newValue != null) {
            updater.accept(newValue);
        }
    }

    public void updateName(String name) {
        updateIfNotNull(newValue -> this.name = newValue, name);
    }

}
