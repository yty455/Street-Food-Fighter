package com.sff.OrderServer.dto;

public enum NotificationType {

    SUCCESS, FAILURE, PROCESSING, COMPLETED, REFUSED, REQUEST

        /*
    알림 종류 6가지
    펀딩성공 - SUCCESS
    펀딩실패 - FAILURE
    주문접수 - PROCESSING
    음식준비 - COMPLETED
    주문거절 - REFUSED
    리뷰요청 - REQUEST
     */
}
