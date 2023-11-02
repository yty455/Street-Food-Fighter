package com.sff.OrderServer.funding.dto;

import com.sff.OrderServer.order.dto.OrderMenuResponse;
import com.sff.OrderServer.order.entity.OrderState;
import java.time.LocalDateTime;
import java.util.List;

public class FundingDetailResponse {
    private OrderState state;
    private String storeName;
    private String storeUrl;
    private String activeArea;
    private LocalDateTime createAt;
    private String receiptNumber;
    private Long orderId;
    private String requirement;
    private List<OrderMenuResponse> orderMenuResponseList;
    private int totalPrice;
}
