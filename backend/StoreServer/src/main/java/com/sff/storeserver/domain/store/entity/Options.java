package com.sff.storeserver.domain.store.entity;

import com.sff.storeserver.common.BaseEntity;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Where;

import static jakarta.persistence.FetchType.LAZY;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder(toBuilder = true)
@Where(clause = "status = 'ACTIVE'")
public class Options extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "OPTION_ID")
    private Long id;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "MENU_ID")
    private Menu menu;

    private String name;
    private int price;

    public void setMenu(Menu menu) {
        this.menu = menu;
    }

    public void delete() {
        this.deleteStatus();
    }
}
