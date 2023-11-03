package com.sff.OrderServer.order.entity;

public enum OrderState {
    PAYMENT_IN_PROGRESS, WAITING, PROCESSING, COMPLETED, REFUSED, CANCELED;
}
