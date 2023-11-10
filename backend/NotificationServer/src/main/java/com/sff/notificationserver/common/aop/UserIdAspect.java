package com.sff.notificationserver.common.aop;

import com.sff.notificationserver.common.error.type.BaseException;
import com.sff.notificationserver.common.utils.ApiError;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;

@Aspect
@Component
@RequiredArgsConstructor
public class UserIdAspect {

    private final HttpServletRequest request;

    @Before("@annotation(UserIdRequired)")
    public void getUserId(JoinPoint joinPoint) {
        String userIdHeader = request.getHeader("UserId");
        if (userIdHeader == null) {
            throw new BaseException(new ApiError("request header 에 userId가 없습니다", 1000));
        }

        Long userId = Long.parseLong(userIdHeader);

        // userId를 메소드 인자로 전달
        Object[] args = joinPoint.getArgs();
        for (Object arg : args) {
            if (arg instanceof UserIdHolder) {
                ((UserIdHolder) arg).setUserId(userId);
                break;
            }
        }
    }
}