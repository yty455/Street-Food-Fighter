package com.sff.OrderServer.funding.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class OrderOption {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderOptionId;

    @ManyToOne
    @Column(name = "ORDER_MENU_ID", nullable = false)
    private OrderMenu orderMenu;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private Integer price;
}
