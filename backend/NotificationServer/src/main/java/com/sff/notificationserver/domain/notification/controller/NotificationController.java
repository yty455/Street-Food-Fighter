package com.sff.notificationserver.domain.notification.controller;

import com.sff.notificationserver.common.utils.ApiResult;
import com.sff.notificationserver.common.utils.ApiUtils;
import com.sff.notificationserver.domain.notification.dto.NotificationRequest;
import com.sff.notificationserver.domain.notification.dto.NotificationResponse;
import com.sff.notificationserver.domain.notification.dto.UserNotificationInfo;
import com.sff.notificationserver.domain.notification.service.NotificationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@Tag(name = "알림 API", description = "알림 관련 API")
@RestController
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;

    @Operation(summary = "손님 - 알림 조회", description = "손님의 알림 목록을 조회 합니다.")
    @GetMapping("/api/notification-server/user/{userId}/notification")
    public ApiResult<?> getTodayNotifications(@PathVariable("userId") Long userId,
                                              @RequestParam @Parameter(name = "page", description = "요청하는 페이지") int page,
                                              @RequestParam @Parameter(name = "size", description = "가져오려는 알림 개수") int size) {

        NotificationResponse notificationResponse = notificationService.getNotifications(userId, page, size);

        return ApiUtils.success(notificationResponse);
    }

//    @Operation(summary = "손님 - 알림 발송", description = "손님에게 푸시 알림 쏘기.")
//    @PostMapping("/api/notification-server/user/notification")
//    public ApiResult<?> sendNotificationToUser(@RequestBody UserNotificationInfo userNotificationInfo) {
//
//        notificationService.sendNotificationToUser(userNotificationInfo);
//
//        return ApiUtils.success("손님 알림 발송 성공");
//    }
//
//    @Operation(summary = "사장님 - 알림 발송", description = "사장님에게 푸시 알림 쏘기.")
//    @PostMapping("/api/notification-server/owner/notification")
//    public ApiResult<?> sendNotificationToOwner(@RequestBody NotificationRequest notificationRequest) {
//
//        notificationService.sendNotificationToOwner(notificationRequest);
//
//        return ApiUtils.success("사장님 알림 발송 성공");
//    }

}
