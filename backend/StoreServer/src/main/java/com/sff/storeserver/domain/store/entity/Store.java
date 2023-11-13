package com.sff.storeserver.domain.store.entity;

import com.sff.storeserver.common.BaseEntity;
import com.sff.storeserver.domain.flag.entity.Flag;
import com.sff.storeserver.domain.store.dto.StoreStartInfo;
import com.sff.storeserver.domain.store.dto.StoreUpdateCategory;
import com.sff.storeserver.domain.store.dto.StoreUpdateInfo;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Where;

import java.time.LocalTime;
import java.util.List;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder(toBuilder = true)
@Where(clause = "status = 'ACTIVE'")
public class Store extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "STORE_ID")
    private Long id;

    private Long ownerId;
    private String name;
    private String ownerName;
    private String phone;

    @Enumerated(EnumType.STRING)
    private CategoryType category;
    private String businessCategory;
    private String information;
    private String introduction;
    private LocalTime openTime;
    private LocalTime closeTime;
    private String activeArea;
    private double lati;
    private double longi;
    @Enumerated(EnumType.STRING)
    private BusinessType state;
    @Embedded
    private Address address;

    @OneToMany(mappedBy = "store", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Menu> menus;

    @OneToMany(mappedBy = "store", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Flag> flags;

    public void update(StoreUpdateInfo storeInfo) {
        this.name = storeInfo.getName();
        this.ownerName = storeInfo.getOwnerName();
        this.phone = storeInfo.getPhone();
        this.openTime = storeInfo.getOpenTime();
        this.closeTime = storeInfo.getCloseTime();
        this.information = storeInfo.getInformation();
        this.introduction = storeInfo.getIntroduction();
    }

    public void updateCategory(StoreUpdateCategory storeUpdateCategory) {
        this.category = storeUpdateCategory.getCategory();
        this.businessCategory = storeUpdateCategory.getBusinessCategory();
    }

    public void updateAddress(String region1, String region2, String region3, String region4) {
        if (region1 != null && region2 != null && region3 != null) {
            if (region4 != null) {
                this.address = new Address(region1, region2, region3, region4);
            } else {
                this.address = new Address(region1, region2, region3);
            }
        }
    }

    public void delete() {
        this.deleteStatus();
        menus.forEach(Menu::delete);
        flags.forEach(Flag::delete);
    }

    public void startBusiness(StoreStartInfo storeStartInfo) {
        state = BusinessType.OPEN;
        lati = storeStartInfo.getLati();
        longi = storeStartInfo.getLongi();
        activeArea = storeStartInfo.getActiveArea();
        updateAddress(storeStartInfo.getRegion1(), storeStartInfo.getRegion2(), storeStartInfo.getRegion3(), storeStartInfo.getRegion4());
    }

    public void closeBusiness() {
        state = BusinessType.CLOSE;
    }

}
