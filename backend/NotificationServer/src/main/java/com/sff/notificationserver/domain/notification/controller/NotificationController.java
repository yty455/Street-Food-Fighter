package com.sff.notificationserver.domain.notification.controller;

import com.sff.notificationserver.common.aop.UserIdHolder;
import com.sff.notificationserver.common.aop.UserIdRequired;
import com.sff.notificationserver.common.utils.ApiResult;
import com.sff.notificationserver.common.utils.ApiUtils;
import com.sff.notificationserver.domain.notification.dto.NotificationResponse;
import com.sff.notificationserver.domain.notification.dto.NotificationUpdateRequest;
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
    @UserIdRequired
    @GetMapping("/api/noti-server/user/notification")
    public ApiResult<?> getTodayNotifications(UserIdHolder userIdHolder,
                                              @RequestParam @Parameter(name = "page", description = "요청하는 페이지") int page,
                                              @RequestParam @Parameter(name = "size", description = "가져오려는 알림 개수") int size) {

        NotificationResponse notificationResponse = notificationService.getNotifications(userIdHolder.getUserId(), page, size);

        return ApiUtils.success(notificationResponse);
    }

    @Operation(summary = "손님 - 펀딩성공-주문하기/취소, 리뷰요청-작성 후 타입 처리", description = "손님이 알림목록에서 작업한 후 알림상태를 변경합니다.")
    @UserIdRequired
    @PutMapping("/api/noti-server/notification")
    public ApiResult<?> updateNotificationType(@RequestBody NotificationUpdateRequest notificationUpdateRequest) {

        notificationService.updateNotification(notificationUpdateRequest);

        return ApiUtils.success("알림 상태 변경 완료");
    }

}
