package com.sff.OrderServer.funding.entity;

public enum FundingState {
    PAYMENT_IN_PROGRESS, WAITING, SUCCESS, FAILURE, CANCEL, BEFORE_ORDER, ORDER_COMPLETED;
}
