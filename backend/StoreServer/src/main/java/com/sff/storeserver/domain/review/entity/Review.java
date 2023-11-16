package com.sff.storeserver.domain.review.entity;

import com.sff.storeserver.common.BaseEntity;
import com.sff.storeserver.domain.store.entity.Store;
import jakarta.persistence.*;
import lombok.*;

import static jakarta.persistence.FetchType.LAZY;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder(toBuilder = true)
public class Review extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "REVIEW_ID")
    private Long id;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "STORE_ID")
    private Store store;

    private Long userId;
    private Long orderId;

    private String content;
    private Integer score;

}
