package com.sff.OrderServer.order.dto;

import com.sff.OrderServer.order.entity.OrderState;
import java.time.LocalDateTime;
import java.util.List;
import lombok.Getter;

@Getter
public class OrderResponse {

    private Long orderId;
    // 가게 정보 : 이름 / 이미지 / 주소
    private List<OrderMenuResponse> orderMenuList;

    private Integer receiptNumber;
    private OrderState state;
    private String requirement;
    private LocalDateTime orderDate;
}
