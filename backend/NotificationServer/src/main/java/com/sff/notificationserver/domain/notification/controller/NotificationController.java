package com.sff.notificationserver.domain.notification.controller;

import com.sff.notificationserver.common.utils.ApiResult;
import com.sff.notificationserver.common.utils.ApiUtils;
import com.sff.notificationserver.domain.notification.dto.NotificationInfo;
import com.sff.notificationserver.domain.notification.dto.UserNotificationInfo;
import com.sff.notificationserver.domain.notification.service.NotificationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@Tag(name = "알림 API", description = "알림 관련 API")
@RestController
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;

    @Operation(summary = "손님 - 알림 조회", description = "손님의 알림 목록을 조회합니다")
    @GetMapping("/api/notification-server/user/notification")
    public ApiResult<?> getNotification(@RequestBody Long userId) {

        notificationService.getNotification(userId);

        return ApiUtils.success("성공");
    }

    @Operation(summary = "손님 - 알림 발송", description = "손님에게 알림을 발송합니다.")
    @PostMapping("/api/user/notification")
    public ApiResult<?> sendNotificationToUser(@RequestBody UserNotificationInfo userNotificationInfo) {

        notificationService.sendNotificationToUser(userNotificationInfo);

        return ApiUtils.success("성공");
    }

    @Operation(summary = "사장님 - 알림 발송", description = "사장님에게 알림을 발송합니다.")
    @PostMapping("/api/owner/notification")
    public ApiResult<?> sendNotificationToOwner(@RequestBody NotificationInfo notificationInfo) {

        notificationService.sendNotificationToOwner(notificationInfo);

        return ApiUtils.success("성공");
    }


//    // 성공 시 데이터 리턴
//    public ApiResult<?> getTest() {
//        return ApiUtils.success(recordService.getTest());
//    }
//
//    // 실패 시 에러 코드, 메시지 리턴 (일반적으로 Service단에서 처리)
//    throw new BaseException(new ApiError({에러 메시지},{에러 코드});
//
//    // valid 예외처리
//    public ApiResult<> create(@Valid UserRequest userRequest , BindingResult bindingResult) {
//        if (bindingResult.hasErrors()) {
//            throw new ValidationException(bindingResult.getFieldErrors());
//        }
//        return ApiUtils.success("성공");
//    }

}
