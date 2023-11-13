package com.sff.OrderServer.funding.entity;

public enum FundToOrderState {
    BEFORE_ORDER,
    ORDER_COMPLETED,
    CANCEL,
    FAILED;
}
