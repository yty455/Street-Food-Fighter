package com.sff.notificationserver.domain.notification.service;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.Message;
import com.sff.notificationserver.domain.notification.dto.*;
import com.sff.notificationserver.domain.notification.entity.Notification;
import com.sff.notificationserver.domain.notification.repository.NotificationRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.Arrays;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class NotificationService {

    @Value("${project.properties.firebase-create-scoped}")
    String fireBaseCreateScoped;

    @Value("${project.properties.firebase-topic}")
    String topic;

    final double getRefundFee = 0.1;

    String tokenf = "c1agebjUTSaN111v7igtKj:APA91bG744QXqT18Y7Vp_1QoqeXoC_PJ1JAQYstBgXtp6HrhoNrXyIwUXSvJ7roCWhgxhBOFph0x8AqwHs92kAN2FkM1TGNxYUAIgCRpfZjXs83dzMwHi15nMPaYT2r50ZS0m2wcTD1y";

    private FirebaseMessaging firebaseMessaging;

    private final NotificationRepository notificationRepository;

    public NotificationResponse getNotifications(Long userId, int page, int size) {

        PageRequest pageRequest = PageRequest.of(page, size);

        Slice<NotificationInfo> notificationInfos = notificationRepository.findByUserId(userId, pageRequest);

        // 환불 수수료 정책 도입시 변경
        double refundFee = getRefundFee;

        return NotificationResponse.builder()
                .refundFee(refundFee)
                .notificationInfos(notificationInfos)
                .build();
    }

    @Transactional
    public void sendNotificationToUser(UserNotificationInfo userNotificationInfo) {
        // 손님 알림 종류 - 펀딩 성공, 실패 / 주문 접수 성공, 거절, 조리완료 / 리뷰

        String title = null;
        String content = null;
        String url = null;

        switch (userNotificationInfo.getRecipient_type()) {
            case "주문성공":
                title = "주문이 접수 되었어요";
                content = userNotificationInfo.getStoreName() + " 사장님이 맛있게 드실수 있도록 메뉴를 조리하고 있어요";
                break;
            case "주문거절":
                title = "주문이 거절 되었어요";
                content = userNotificationInfo.getStoreName() + " 사장님이 집 가고 싶대요... 다음에 주문해줘요";
                break;
            case "조리완료":
                title = "음식이 준비 되었어요";
                content = userNotificationInfo.getStoreName() + " 사장님이 빨리 안오면 다 먹어버린대요";
                break;
            case "펀딩성공":
                title = "펀딩이 성공했어요";
                content = userNotificationInfo.getStoreName() + "이 오픈했어요! 먹으러 슝~!";
                break;
            case "펀딩실패":
                title = "펀딩이 실패했어요";
                content = userNotificationInfo.getStoreName() + "의 선택을 받지 못했어요... 아쉽지만 다음 기회를 노려보아요";
                break;
            case "리뷰요청":
                title = "리뷰를 남겨주세요!";
                content = userNotificationInfo.getStoreName() + "에서 맛있게 드셨나요? 멋진 리뷰 하나만 남겨주세요!";
                break;
        }

        String finalTitle = title;
        String finalContent = content;

        userNotificationInfo.getRecipients().forEach(id -> sendNotification(id, finalTitle, finalContent, url, userNotificationInfo.getRecipient_type()));
    }

    @Transactional
    public void sendNotificationToOwner(NotificationRequest notificationRequest) {
        // TODO - 사장 알림 추가 하기

    }

    @Transactional
    public void sendNotification(Long userId, String title, String content, String url, String type) {
        log.info(sendNotificationByToken(new FCMNotificationRequest(userId, title, content)));
        notificationRepository.save(Notification.builder()
                .recipient(userId)
                .recipient_type(type)
                .content(content)
                .url(url).build());
    }

    @PostConstruct
    public void firebaseSetting() throws IOException {
        //내 firebase 콘솔에서 가져온 비공개 키 파일을 통해 백엔드에서 파이어베이스에 접속함
        GoogleCredentials googleCredentials = GoogleCredentials.fromStream(new ClassPathResource("firebase/streetfoodfighter-75db4-firebase-adminsdk-p8iq0-a111ae6edb.json").getInputStream())
                .createScoped((Arrays.asList(fireBaseCreateScoped)));
        FirebaseOptions secondaryAppConfig = FirebaseOptions.builder()
                .setCredentials(googleCredentials)
                .build();
        FirebaseApp app = FirebaseApp.initializeApp(secondaryAppConfig);
        this.firebaseMessaging = FirebaseMessaging.getInstance(app);
    }

    public String sendNotificationByToken(FCMNotificationRequest fcmDto) {


//            FcmToken fcmToken = fcmTokenRepository.findById(String.valueOf(fcmUserId))
//                    .orElse(null);

//        if (fcmToken != null && user.getNotificationSetting().equals("agree")) {
//            String token = fcmToken.getValue(); //redis에서 토큰 읽어온거

        com.google.firebase.messaging.Notification notification = com.google.firebase.messaging.Notification.builder()
                .setTitle(fcmDto.getTitle())
                .setBody(fcmDto.getBody())
                .build();

        Message message = Message.builder()
                .setToken(tokenf)
                .setNotification(notification)
                .build();

        try {
            firebaseMessaging.send(message);
            return "알림 전송 성공 " + fcmDto.getRecipient();
        } catch (FirebaseMessagingException e) {
            e.printStackTrace();
            return "알림 전송 실패 " + fcmDto.getRecipient();
        }
//        } else {
//            return "Redis에 유저 FCM token 없음 " + fcmDto.getUser();
//        }
    }

}
