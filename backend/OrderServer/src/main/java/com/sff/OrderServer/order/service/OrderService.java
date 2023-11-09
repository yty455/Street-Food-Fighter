package com.sff.OrderServer.order.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sff.OrderServer.bucket.dto.Option;
import com.sff.OrderServer.bucket.entity.Bucket;
import com.sff.OrderServer.bucket.entity.OrderMenu;
import com.sff.OrderServer.bucket.entity.OrderOption;
import com.sff.OrderServer.bucket.repository.BucketRepository;
import com.sff.OrderServer.bucket.repository.OrderMenuRepository;
import com.sff.OrderServer.dto.GradeUpdateRequest;
import com.sff.OrderServer.dto.MemberInfoResponse;
import com.sff.OrderServer.dto.NotificationType;
import com.sff.OrderServer.dto.ReviewMSAResponse;
import com.sff.OrderServer.dto.StoreMSARequest;
import com.sff.OrderServer.dto.StoreMSAResponse;
import com.sff.OrderServer.dto.UserInfo;
import com.sff.OrderServer.dto.UserNotificationInfo;
import com.sff.OrderServer.error.code.BucketError;
import com.sff.OrderServer.error.code.FundingError;
import com.sff.OrderServer.error.code.NetworkError;
import com.sff.OrderServer.error.code.OrderError;
import com.sff.OrderServer.error.type.BaseException;
import com.sff.OrderServer.funding.entity.Funding;
import com.sff.OrderServer.funding.repository.FundingRepository;
import com.sff.OrderServer.infra.StoreClient;
import com.sff.OrderServer.infra.UserClient;
import com.sff.OrderServer.order.dto.MenuItem;
import com.sff.OrderServer.order.dto.MenuPerOrderResponse;
import com.sff.OrderServer.order.dto.OrderCreateRequest;
import com.sff.OrderServer.order.dto.OrderCreateResponse;
import com.sff.OrderServer.order.dto.OrderDetailResponse;
import com.sff.OrderServer.order.dto.OrderItem;
import com.sff.OrderServer.order.dto.OrderPerUser;
import com.sff.OrderServer.order.dto.OrderRecordOfState;
import com.sff.OrderServer.order.dto.OrderResponse;
import com.sff.OrderServer.order.dto.OwnerOrderDetailResponse;
import com.sff.OrderServer.order.entity.OrderRecord;
import com.sff.OrderServer.order.entity.OrderState;
import com.sff.OrderServer.order.entity.ReviewState;
import com.sff.OrderServer.order.repository.OrderRecordRepository;
import com.sff.OrderServer.utils.ApiError;
import com.sff.OrderServer.utils.ApiResult;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class OrderService {

    private final OrderRecordRepository orderRepository;
    private final BucketRepository bucketRepository;
    private final OrderMenuRepository orderMenuRepository;
    private final FundingRepository fundingRepository;
    private final StoreClient storeClient;
    private final UserClient userClient;
    private final ObjectMapper objectMapper = new ObjectMapper();
    private final KafkaTemplate<String, String> kafkaTemplate;

    @Transactional
    public OrderCreateResponse createOrder(OrderCreateRequest orderCreateRequest, Long userId) {
        Integer orderCount = orderRepository.countOrdersByStoreId(orderCreateRequest.getStoreId(),
                LocalDateTime.now());
        Bucket bucket = getBucket(orderCreateRequest.getBucketId());
        if (orderRepository.findByBucket(bucket).isPresent()) {
            throw new BaseException(new ApiError(OrderError.EXIST_ORDER_RECORD));
        }
        try {
            Long orderId = orderRepository.save(
                    new OrderRecord(orderCreateRequest, orderCount, bucket, userId)).getOrderId();
            return new OrderCreateResponse(orderId, bucket.getTotalPrice());
        } catch (Exception e) {
            throw new BaseException(new ApiError(OrderError.FAILED_CREATE_ORDER));
        }

    }

    public List<OrderResponse> getOrderRecords(Long userId) {
        List<OrderRecord> orderRecordList = orderRepository.findAllByUserIdOrderByCreatedAtDesc(
                userId);
        System.out.println(orderRecordList.size());
        List<OrderResponse> orderResponseList = new ArrayList<>();
        List<Long> storeIds = new ArrayList<>();
        for (OrderRecord orderRecord : orderRecordList) {
            storeIds.add(orderRecord.getStoreId());
        }
        List<StoreMSAResponse> storeMSAResponseList = getStoreMSAResponses(storeIds);
        for (OrderRecord orderRecord : orderRecordList) {
            StoreMSAResponse store = getStoreInfo(storeMSAResponseList, orderRecord.getStoreId());

            Bucket bucket = orderRecord.getBucket();
            Integer totalPrice = bucket.getTotalPrice();

            List<OrderMenu> menus = orderMenuRepository.findAllByBucket(bucket);
            OrderMenu menu = menus.get(0);
            Integer restCount = menus.size() - 1;

            orderResponseList.add(
                    new OrderResponse(orderRecord, store, totalPrice, menu, restCount));
        }
        return orderResponseList;
    }

    public OrderDetailResponse getOrderRecordDetail(Long orderId) {
        OrderRecord orderRecord = getOrderRecord(orderId);
        Bucket bucket = orderRecord.getBucket();
        List<Long> storeIds = new ArrayList<>();
        storeIds.add(orderRecord.getStoreId());
        List<StoreMSAResponse> storeMSAResponseList = getStoreMSAResponses(storeIds);

        return new OrderDetailResponse(orderRecord, getOrderMenusDetail(bucket),
                getStoreInfo(storeMSAResponseList, orderRecord.getStoreId()));
    }

    // 바구니에 들은 주문 메뉴, 옵션
    private List<OrderItem> getOrderMenusDetail(Bucket bucket) {
        List<OrderMenu> orderMenuList = orderMenuRepository.findAllByBucket(bucket);
        List<OrderItem> orderItemList = new ArrayList<>();
        for (OrderMenu orderMenu : orderMenuList) {
            List<Option> orderOptionList = getOrderOptionsDetail(orderMenu);
            int menuTotalPrice = calMenuAndOption(orderMenu, orderOptionList);
            orderItemList.add(
                    new OrderItem(orderMenu, orderOptionList, menuTotalPrice));
        }
        return orderItemList;
    }

    // 메뉴에 달린 옵션
    private List<Option> getOrderOptionsDetail(OrderMenu orderMenu) {
        List<OrderOption> orderOptionList = orderMenu.getOptions();
        List<Option> optionList = new ArrayList<>();
        for (OrderOption orderOption : orderOptionList) {
            optionList.add(new Option(orderOption));
        }
        return optionList;
    }

    // 해당 메뉴에 대한 총 합 계산
    private int calMenuAndOption(OrderMenu orderMenu,
            List<Option> optionList) {
        int menuTotalPrice = 0;
        for (Option option : optionList) {
            menuTotalPrice += option.getPrice();
        }
        return (menuTotalPrice + orderMenu.getPrice()) * orderMenu.getCount();
    }

    // 바구니에 들은 주문 메뉴/메뉴 개수, 옵션 x
    private List<MenuItem> getOrderMenuAndCount(Bucket bucket) {
        List<OrderMenu> orderMenuList = orderMenuRepository.findAllByBucket(bucket);
        List<MenuItem> menuList = new ArrayList<>();
        for (OrderMenu orderMenu : orderMenuList) {
            menuList.add(new MenuItem(orderMenu));
        }
        return menuList;
    }

    public List<OrderRecordOfState> getWaitingOrders(Long storeId) {
        List<OrderRecordOfState> waitingOrderList = new ArrayList<>();
        List<OrderRecord> watingOrderRecordList = orderRepository.findCurrentOrdersByDate(storeId,
                OrderState.WAITING, LocalDateTime.now());
        for (OrderRecord orderRecord : watingOrderRecordList) {
            Bucket bucket = orderRecord.getBucket();
            OrderRecordOfState orderRecordOfState = new OrderRecordOfState(orderRecord,
                    getOrderMenuAndCount(bucket));
            waitingOrderList.add(orderRecordOfState);
        }
        return waitingOrderList;
    }

    public List<OrderRecordOfState> getProcessingOrders(Long storeId) {
        List<OrderRecordOfState> processingOrderList = new ArrayList<>();
        List<OrderRecord> processingOrderRecordList = orderRepository.findCurrentOrdersByDate(
                storeId,
                OrderState.PROCESSING, LocalDateTime.now());
        for (OrderRecord orderRecord : processingOrderRecordList) {
            Bucket bucket = orderRecord.getBucket();
            OrderRecordOfState orderRecordOfState = new OrderRecordOfState(orderRecord,
                    getOrderMenuAndCount(bucket));
            processingOrderList.add(orderRecordOfState);
        }
        return processingOrderList;
    }

    public List<OrderRecordOfState> getCompletedOrders(Long storeId) {
        List<OrderRecordOfState> completedOrderList = new ArrayList<>();
        List<OrderRecord> completedOrderRecordList = orderRepository.findCurrentOrdersByDate(
                storeId,
                OrderState.COMPLETED, LocalDateTime.now());
        for (OrderRecord orderRecord : completedOrderRecordList) {
            Bucket bucket = orderRecord.getBucket();
            OrderRecordOfState orderRecordOfState = new OrderRecordOfState(orderRecord,
                    getOrderMenuAndCount(bucket));
            completedOrderList.add(orderRecordOfState);
        }
        return completedOrderList;
    }

    public List<OrderRecordOfState> getAllOrders(Long storeId) {
        List<OrderRecordOfState> allOrderList = new ArrayList<>();
        List<OrderRecord> allOrderRecordList = orderRepository.findAllByStoreIdOrderByCreatedAtDesc(
                storeId);
        for (OrderRecord orderRecord : allOrderRecordList) {
            Bucket bucket = orderRecord.getBucket();
            OrderRecordOfState orderRecordOfState = new OrderRecordOfState(orderRecord,
                    getOrderMenuAndCount(bucket));
            allOrderList.add(orderRecordOfState);
        }
        return allOrderList;
    }

    // msa o
    public OwnerOrderDetailResponse getOwnerOrderDetail(Long orderId) {
        // 주문 ID 를 가게 서비스 에 보내서 리뷰 ID/ 리뷰 내용/ 별점 받기
        ReviewMSAResponse review = getReviewInfo(orderId);
        // 회원 ID 를 회원 서비스 에 보내서 회원 이름, 등급, 연락처 받기
        OrderRecord orderRecord = getOrderRecord(orderId);
        MemberInfoResponse member = getMemberInfo();
        return new OwnerOrderDetailResponse(orderRecord, member, review,
                getOrderMenusDetail(orderRecord.getBucket()));
    }

    @Transactional
    public void updateOrderWaiting(Long orderId) {
        OrderRecord orderRecord = getOrderRecord(orderId);
        try {
            orderRecord.updateOrderState(OrderState.WAITING);
        } catch (Exception e) {
            throw new BaseException(new ApiError(OrderError.FAILED_UPDATE_STATE_WAITING));
        }
        try {
            orderRecord.getBucket().updateState();
        } catch (Exception e) {
            throw new BaseException(new ApiError(BucketError.UPDATE_BUCKET_STATE_ERROR));
        }
    }

    // msa o kafka o
    // 가게 서비스에 "조리중" 알림 요청
    @Transactional
    public void updateOrderProcessing(Long orderId) {
        OrderRecord orderRecord = getOrderRecord(orderId);
        try {
            orderRecord.updateOrderState(OrderState.PROCESSING);
        } catch (Exception e) {
            throw new BaseException(new ApiError(OrderError.FAILED_UPDATE_STATE_PROCESSING));
        }
        try {
            // 직렬화할 객체 생성
            UserInfo userInfo = new UserInfo(orderRecord);
            List<UserInfo> userInfoList = new ArrayList<>();
            userInfoList.add(userInfo);
            UserNotificationInfo userNotificationInfo = UserNotificationInfo.builder()
                    .storeId(orderRecord.getStoreId()).type(NotificationType.PROCESSING)
                    .storeName("").userList(userInfoList).build();
            // 객체를 JSON 문자열로 직렬화
            String userInfoJson = objectMapper.writeValueAsString(userNotificationInfo);
            kafkaTemplate.send("notification-service-notify-user", userInfoJson);
        } catch (Exception e) {
            e.printStackTrace();
            throw new BaseException(new ApiError(OrderError.FAILED_KAFKA));
        }
    }

    // msa o kafka o
    // 가게 서비스에 "조리 완료" 알림 요청
    @Transactional
    public void updateOrderCompleted(Long orderId) {
        OrderRecord orderRecord = getOrderRecord(orderId);
        try {
            orderRecord.updateOrderState(OrderState.COMPLETED);
        } catch (Exception e) {
            throw new BaseException(new ApiError(OrderError.FAILED_UPDATE_STATE_COMPLETED));
        }
        try {
            // 직렬화할 객체 생성
            UserInfo userInfo = new UserInfo(orderRecord);
            List<UserInfo> userInfoList = new ArrayList<>();
            userInfoList.add(userInfo);
            UserNotificationInfo userNotificationInfo = UserNotificationInfo.builder()
                    .storeId(orderRecord.getStoreId()).type(NotificationType.COMPLETED)
                    .storeName("").userList(userInfoList).build();
            // 객체를 JSON 문자열로 직렬화
            String userInfoJson = objectMapper.writeValueAsString(userNotificationInfo);
            kafkaTemplate.send("notification-service-notify-user", userInfoJson);
        } catch (Exception e) {
            e.printStackTrace();
            throw new BaseException(new ApiError(OrderError.FAILED_KAFKA));
        }
    }

    // msa o kafka o
    // 가게 서비스에 "리뷰 요청" 알림 요청
    @Transactional
    public void updateOrderRequest(Long orderId) {
        OrderRecord orderRecord = getOrderRecord(orderId);
        try {
            orderRecord.updateReviewState(ReviewState.REQUEST);
        } catch (Exception e) {
            throw new BaseException(new ApiError(OrderError.FAILED_UPDATE_STATE_REQUEST));
        }
        try {
            // 직렬화할 객체 생성
            UserInfo userInfo = new UserInfo(orderRecord);
            List<UserInfo> userInfoList = new ArrayList<>();
            userInfoList.add(userInfo);
            UserNotificationInfo userNotificationInfo = UserNotificationInfo.builder()
                    .storeId(orderRecord.getStoreId()).type(NotificationType.REQUEST)
                    .storeName("").userList(userInfoList).build();
            // 객체를 JSON 문자열로 직렬화
            String userInfoJson = objectMapper.writeValueAsString(userNotificationInfo);
            kafkaTemplate.send("notification-service-notify-user", userInfoJson);
        } catch (Exception e) {
            e.printStackTrace();
            throw new BaseException(new ApiError(OrderError.FAILED_KAFKA));
        }
    }

    // msa o kafka o
    // 가게 서비스에 "주문 거절" 알림 요청
    @Transactional
    public void updateOrderRefused(Long orderId) {
        OrderRecord orderRecord = getOrderRecord(orderId);
        try {
            orderRecord.updateOrderState(OrderState.REFUSED);
        } catch (Exception e) {
            throw new BaseException(new ApiError(OrderError.FAILED_UPDATE_STATE_REFUSED));
        }
        try {
            // 직렬화할 객체 생성
            UserInfo userInfo = new UserInfo(orderRecord);
            List<UserInfo> userInfoList = new ArrayList<>();
            userInfoList.add(userInfo);
            UserNotificationInfo userNotificationInfo = UserNotificationInfo.builder()
                    .storeId(orderRecord.getStoreId()).type(NotificationType.REFUSED)
                    .storeName("").userList(userInfoList).build();
            // 객체를 JSON 문자열로 직렬화
            String userInfoJson = objectMapper.writeValueAsString(userNotificationInfo);
            kafkaTemplate.send("notification-service-notify-user", userInfoJson);
        } catch (Exception e) {
            e.printStackTrace();
            throw new BaseException(new ApiError(OrderError.FAILED_KAFKA));
        }
    }

    @Transactional
    public Long createOrderAboutFunding(Long fundingId) {
        Funding funding = fundingRepository.findById(fundingId).orElseThrow(
                () -> new BaseException(new ApiError(FundingError.NOT_EXIST_FUNDING)));
        Integer orderCount = orderRepository.countOrdersByStoreId(funding.getStoreId(),
                LocalDateTime.now());
        Bucket bucket = funding.getBucket();
        try {
            OrderRecord orderRecord = orderRepository.save(
                    new OrderRecord(funding, orderCount, bucket));
            return orderRecord.getOrderId();
        } catch (Exception e) {
            throw new BaseException(new ApiError(OrderError.FAILED_CREATE_ORDER));
        }
    }

    @Transactional
    public void updateOrderAboutFunding(Long fundingId, Long orderId) {
        OrderRecord orderRecord = getOrderRecord(orderId);
        Funding funding = fundingRepository.findById(fundingId).orElseThrow(
                () -> new BaseException(new ApiError(FundingError.NOT_EXIST_FUNDING)));
        try {
            orderRecord.updateOrderState(OrderState.WAITING);
        } catch (Exception e) {
            throw new BaseException(new ApiError(OrderError.FAILED_UPDATE_STATE_WAITING));
        }
        try {
            funding.updateOrderStateComplete();
        } catch (Exception e) {
            throw new BaseException(new ApiError(FundingError.FAILED_UPDATE_STATE_ORDER_COMPLETED));
        }
    }

    public Long getStoreId(Long orderId) {
        Long storeId = orderRepository.findById(orderId).get().getStoreId();
        return storeId;
    }

    @Transactional
    public List<MenuPerOrderResponse> getMenusPerOrders(List<Long> orders) {
        List<MenuPerOrderResponse> menuPerOderResponseList = new ArrayList<>();

        for (Long orderId : orders) {
            OrderRecord orderRecord = getOrderRecord(orderId);
            Bucket bucket = orderRecord.getBucket();
            List<String> menuList = getOrderMenus(bucket);
            menuPerOderResponseList.add(new MenuPerOrderResponse(orderId, menuList));
        }
        return menuPerOderResponseList;
    }

    // 바구니에 들은 주문 메뉴
    private List<String> getOrderMenus(Bucket bucket) {
        List<OrderMenu> orderMenuList = orderMenuRepository.findAllByBucket(bucket);
        List<String> menuList = new ArrayList<>();
        for (OrderMenu orderMenu : orderMenuList) {
            menuList.add(orderMenu.getName());
        }
        return menuList;
    }

    // 매월 1일 00:00에 구동
    @Scheduled(cron = "0 0 0 1 * ?", zone = "Asia/Seoul")
//    //1분 마다 실행 ex) 00:01, 00:02 ...
//    @Scheduled(cron = "0 0/1 * * * *")
    public void run() {
        List<OrderPerUser> orderPerUserList = getOrderPerUser();
        try {
            // 직렬화할 객체 생성
            GradeUpdateRequest gradeUpdateRequest = GradeUpdateRequest.builder()
                    .gradeUpdateRequests(orderPerUserList).build();
            // 객체를 JSON 문자열로 직렬화
            String gradeUpdateRequestJson = objectMapper.writeValueAsString(gradeUpdateRequest);
            kafkaTemplate.send("order-service-update-user", gradeUpdateRequestJson);
        } catch (Exception e) {
            e.printStackTrace();
            throw new BaseException(new ApiError(OrderError.FAILED_KAFKA));
        }
    }

    public List<OrderPerUser> getOrderPerUser() {
        int previousMonth = LocalDate.now().minusMonths(1).getMonthValue();
        List<Object[]> orderPerUserList = orderRepository.countOrdersByUserId(previousMonth);
        return orderPerUserList.stream()
                .map(OrderPerUser -> new OrderPerUser((Long) OrderPerUser[0],
                        ((Long) OrderPerUser[1]).intValue())).collect(Collectors.toList());
    }

    private Bucket getBucket(Long bucketId) {
        return bucketRepository.findById(bucketId).orElseThrow(
                () -> new BaseException(new ApiError(BucketError.NON_EXIST_BUCKET_USER))
        );
    }

    private OrderRecord getOrderRecord(Long orderId) {
        return orderRepository.findById(orderId).orElseThrow(
                () -> new BaseException(new ApiError(OrderError.NON_EXIST_ORDER))
        );
    }

    private List<StoreMSAResponse> getStoreMSAResponses(List<Long> storeIds) {
        StoreMSARequest storeMSARequest = new StoreMSARequest(storeIds);
        ApiResult<List<StoreMSAResponse>> result;
        try {
            result = storeClient.getStores(storeMSARequest);

        } catch (Exception e) {
            e.printStackTrace();
            throw new BaseException(new ApiError(NetworkError.NETWORK_ERROR_ORDER));
        }
        if (result.getSuccess() == false) {
            throw new BaseException(result.getApiError());
        }
        return result.getResponse();
    }

    public StoreMSAResponse getStoreInfo(List<StoreMSAResponse> storeMSAResponseList,
            Long storeId) {
        return storeMSAResponseList.stream()
                .filter(response -> response.getStoreId().equals(storeId))
                .findFirst()
                .orElseThrow(() -> new BaseException(new ApiError(OrderError.NON_EXIST_STORE)));
    }

    public ReviewMSAResponse getReviewInfo(Long orderId) {
        ApiResult<ReviewMSAResponse> result;
        try {
            result = storeClient.getReview(orderId);

        } catch (Exception e) {
            e.printStackTrace();
            throw new BaseException(new ApiError(NetworkError.NETWORK_ERROR_ORDER));
        }
        if (result.getSuccess() == false) {
            throw new BaseException(result.getApiError());
        }
        return result.getResponse();
    }

    private MemberInfoResponse getMemberInfo() {
        ApiResult<MemberInfoResponse> result;
        try {
            result = userClient.getMember();
        } catch (Exception e) {
            e.printStackTrace();
            throw new BaseException(new ApiError(NetworkError.NETWORK_ERROR_ORDER));
        }
        if (result.getSuccess() == false) {
            throw new BaseException(result.getApiError());
        }
        return result.getResponse();
    }
}
