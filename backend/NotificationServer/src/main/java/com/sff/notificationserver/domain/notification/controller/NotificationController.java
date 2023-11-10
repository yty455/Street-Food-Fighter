package com.sff.notificationserver.domain.notification.controller;

import com.sff.notificationserver.common.aop.UserIdHolder;
import com.sff.notificationserver.common.aop.UserIdRequired;
import com.sff.notificationserver.common.utils.ApiResult;
import com.sff.notificationserver.common.utils.ApiUtils;
import com.sff.notificationserver.domain.notification.dto.NotificationResponse;
import com.sff.notificationserver.domain.notification.service.NotificationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "알림 API", description = "알림 관련 API")
@RestController
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;

    @Operation(summary = "손님 - 알림 조회", description = "손님의 알림 목록을 조회 합니다.")
    @UserIdRequired
    @GetMapping("/api/notification-server/user/notification")
    public ApiResult<?> getTodayNotifications(UserIdHolder userIdHolder,
                                              @RequestParam @Parameter(name = "page", description = "요청하는 페이지") int page,
                                              @RequestParam @Parameter(name = "size", description = "가져오려는 알림 개수") int size) {

        NotificationResponse notificationResponse = notificationService.getNotifications(userIdHolder.getUserId(), page, size);

        return ApiUtils.success(notificationResponse);
    }
}
