package com.sff.userserver.domain.member.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static jakarta.persistence.FetchType.LAZY;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Wishlist {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "WISHLIST_ID")
    private Long id;

    @Enumerated(EnumType.STRING)
    private FoodType foodType;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    public static Wishlist create(FoodType foodType, Member member) {
        Wishlist wishlist = new Wishlist();
        wishlist.foodType = foodType;
        wishlist.setMember(member);
        return wishlist;
    }

    public void setMember(Member member) {
        this.member = member;
        member.getWishlists().add(this);
    }
}
