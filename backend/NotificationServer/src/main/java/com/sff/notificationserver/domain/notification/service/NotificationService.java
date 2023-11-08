package com.sff.notificationserver.domain.notification.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.Message;
import com.sff.notificationserver.common.feignClient.UserClient;
import com.sff.notificationserver.domain.notification.dto.*;
import com.sff.notificationserver.domain.notification.entity.Notification;
import com.sff.notificationserver.domain.notification.entity.NotificationType;
import com.sff.notificationserver.domain.notification.repository.NotificationRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.Sort;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.support.KafkaHeaders;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.Arrays;
import java.util.Map;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class NotificationService {

    @Value("${project.properties.firebase-create-scoped}")
    String fireBaseCreateScoped;

    @Value("${project.properties.firebase-topic}")
    String topic;

    final double getRefundFee = 0.1; // 환불 수수료

    String tokenf = "c1agebjUTSaN111v7igtKj:APA91bG744QXqT18Y7Vp_1QoqeXoC_PJ1JAQYstBgXtp6HrhoNrXyIwUXSvJ7roCWhgxhBOFph0x8AqwHs92kAN2FkM1TGNxYUAIgCRpfZjXs83dzMwHi15nMPaYT2r50ZS0m2wcTD1y";

    private FirebaseMessaging firebaseMessaging;

    private final NotificationRepository notificationRepository;

    private final UserClient userClient;
    private final ObjectMapper objectMapper = new ObjectMapper();

    /*
    알림 종류 6가지
    펀딩성공 - SUCCESS
    펀딩실패 - FAILURE
    주문접수 - PROCESSING
    음식준비 - COMPLETED
    주문거절 - REFUSED
    리뷰요청 - REQUEST
     */
    private final Map<NotificationType, String> titleMaker = Map.of(
            NotificationType.SUCCESS, "펀딩이 성공했어요",
            NotificationType.FAILURE, "펀딩이 실패했어요",
            NotificationType.PROCESSING, "주문이 접수 되었어요",
            NotificationType.COMPLETED, "음식이 준비 되었어요",
            NotificationType.REFUSED, "주문이 거절 되었어요",
            NotificationType.REQUEST, "리뷰를 남겨주세요!"
    );

    private final Map<NotificationType, String> contentMaker = Map.of(
            NotificationType.SUCCESS, "이 오픈했어요! 먹으러 슝~!",
            NotificationType.FAILURE, "의 선택을 받지 못했어요... 아쉽지만 다음 기회를 노려보아요",
            NotificationType.PROCESSING, " 사장님이 맛있게 드실수 있도록 메뉴를 조리하고 있어요",
            NotificationType.COMPLETED, " 사장님이 빨리 안오면 다 먹어버린대요",
            NotificationType.REFUSED, " 사장님이 집 가고 싶대요... 다음에 주문해줘요",
            NotificationType.REQUEST, "에서 맛있게 드셨나요? 멋진 리뷰 하나만 남겨주세요!"
    );


    public NotificationResponse getNotifications(Long userId, int page, int size) {

        PageRequest pageRequest = PageRequest.of(page, size, Sort.by("createdDate").descending());

        Slice<NotificationInfo> notificationInfos = notificationRepository.findByUserId(userId, pageRequest);

        // 환불 수수료 정책 도입시 변경
        double refundFee = getRefundFee;
        // 유저 포인트 받아오기
        int userPoint = userClient.getUserPoint(userId).getResponse();

        return NotificationResponse.builder()
                .refundFee(refundFee)
                .userPoint(userPoint)
                .notificationInfos(notificationInfos)
                .build();
    }

    @KafkaListener(topics = "#{notifyUserTopic.name}", groupId = "notification-service-notify-user")
    @Transactional
    public void notifyUser(@Payload String userNotificationInfo, @Header(KafkaHeaders.RECEIVED_PARTITION) int partition) throws IOException {
        UserNotificationInfo createUserInfo = objectMapper.readValue(userNotificationInfo, UserNotificationInfo.class);
        log.info("메시지입니다 : {}", userNotificationInfo);
    }


    @Transactional
    public void sendNotificationToUser(UserNotificationInfo userNotificationInfo) {
        // 손님 알림 종류 - 펀딩 성공, 실패 / 주문 접수 성공, 거절, 조리완료 / 리뷰

        String title = titleMaker.get(userNotificationInfo.getType());
        String content = userNotificationInfo.getStoreName() + contentMaker.get(userNotificationInfo.getType());

        userNotificationInfo.getUserList().forEach(userInfo -> sendNotification(userInfo, title, content, userNotificationInfo.getType()));
    }


    public void sendNotificationToOwner(NotificationRequest notificationRequest) {

        log.info(sendNotificationByToken(new FCMNotificationRequest(notificationRequest.getOwnerId(), "주문이 접수 되었습니다!", "앱을 열어 주문을 확인해 주세요.")));

    }

    @Transactional
    public void sendNotification(UserInfo userInfo, String title, String content, NotificationType type) {
        log.info(sendNotificationByToken(new FCMNotificationRequest(userInfo.getUserId(), title, content)));
        notificationRepository.save(Notification.builder()
                .userId(userInfo.getUserId())
                .type(type)
                .targetId(userInfo.getOrderId())
                .totalPrice(userInfo.getAmount()).build());
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
                .setToken(tokenf) // 토큰 넣어주세요
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
