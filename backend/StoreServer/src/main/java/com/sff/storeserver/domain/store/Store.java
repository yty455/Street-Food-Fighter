package com.sff.storeserver.domain.store;

import com.sff.storeserver.domain.store.dto.StoreInfo;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.geo.Point;

import java.time.LocalDateTime;
import java.util.function.Consumer;

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
    private String category;
    private String businessCategory;
    private String information;
    private String introduction;
    private LocalDateTime openTime;
    private LocalDateTime closeTime;
    private String activeArea;

    @Column(columnDefinition = "Point")
    private Point areaPoint;
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
