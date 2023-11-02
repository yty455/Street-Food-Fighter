package com.sff.notificationserver.domain.notification.entity;

public enum NotificationType {
    BEFORE_ORDER, FAILED, PROCESSING, COMPLETED, REFUSED, REQUEST

    /*
    알림 종류 6가지
    펀딩성공 - BEFORE_ORDER
    펀딩실패 - FAILED
    주문접수 - PROCESSING
    음식준비 - COMPLETED
    주문거절 - REFUSED
    리뷰요청 - REQUEST
     */
}
