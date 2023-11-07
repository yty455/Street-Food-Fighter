package com.sff.OrderServer.bucket.entity;

import com.sff.OrderServer.bucket.dto.Item;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class OrderMenu {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderMenuId;

    @ManyToOne()
    @JoinColumn(name = "BUCKET_ID", nullable = false)
    private Bucket bucket;

    @Column(nullable = false)
    private Long menuId;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private Integer price;

    @Column(nullable = false)
    private String menuUrl;

    @Column(nullable = false)
    private Integer count;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<OrderOption> options;

    public OrderMenu(Bucket bucket, Item item, List<OrderOption> options){
        this.bucket = bucket;
        this.menuId = item.getMenuId();
        this.name = item.getName();
        this.price = item.getPrice();
        this.menuUrl = item.getMenuUrl();
        this.count = item.getCount();
        this.options = options;
    }
}
