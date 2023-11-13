package com.sff.OrderServer.bucket.service;

import com.sff.OrderServer.bucket.dto.BucketRequest;
import com.sff.OrderServer.bucket.dto.BucketRequestList;
import com.sff.OrderServer.bucket.dto.Item;
import com.sff.OrderServer.bucket.dto.Option;
import com.sff.OrderServer.bucket.entity.Bucket;
import com.sff.OrderServer.bucket.entity.OrderMenu;
import com.sff.OrderServer.bucket.entity.OrderOption;
import com.sff.OrderServer.bucket.repository.BucketRepository;
import com.sff.OrderServer.bucket.repository.OrderMenuRepository;
import com.sff.OrderServer.error.code.BucketError;
import com.sff.OrderServer.error.code.NetworkError;
import com.sff.OrderServer.error.type.BaseException;
import com.sff.OrderServer.infra.StoreClient;
import com.sff.OrderServer.utils.ApiError;
import com.sff.OrderServer.utils.ApiResult;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class BucketService {

    private final BucketRepository bucketRepository;
    private final OrderMenuRepository orderMenuRepository;

    private final StoreClient storeClient;

    // Bucket 생성 및 OrderMenu, OrderOption 저장
    @Transactional
    public Bucket createBucket(Long userId, List<BucketRequest> bucketRequests){
        List<Item> items = getMenuAndOptionInformation(new BucketRequestList(bucketRequests));

        Optional<Bucket> tempBucket = bucketRepository.findByUserIdAndPaymentStateFalse(userId);
        if(tempBucket.isPresent()){
            Bucket tBucket = tempBucket.get();
            List<OrderMenu> orderMenuList = orderMenuRepository.findAllByBucket(tBucket);
            orderMenuRepository.deleteAll(orderMenuList);
            bucketRepository.delete(tBucket);
        }

        Bucket bucket = new Bucket(userId, getTotalPrice(items));

        bucketRepository.save(bucket);

        orderMenuRepository.saveAll(getOrderMenuList(items, bucket));
        return bucket;
    }
    // store 서버로 메뉴, 옵션 정보 요청
    private List<Item> getMenuAndOptionInformation(BucketRequestList bucketRequests){
        ApiResult<List<Item>> result;
        try{
            result = storeClient.getMenuAndOptionInformation(bucketRequests);
        }catch (Exception e){
            throw new BaseException(new ApiError(NetworkError.NETWORK_ERROR_STORE));
        }

        if(result.getSuccess()==false){
            throw new BaseException(result.getApiError());
        }
        return result.getResponse();
    }

    // bucket의 total price
    private Integer getTotalPrice(List<Item> items){
        int totalPrice = 0;
        for(Item item : items){
            int optionPrice = 0;
            for(Option option: item.getOptionList()){
                optionPrice += option.getPrice()*item.getCount();
            }
            totalPrice += optionPrice+item.getPrice()*item.getCount();
        }
        return totalPrice;
    }

    // orderMenu - options list 생성 및 저장
    private List<OrderMenu> getOrderMenuList(List<Item> items, Bucket bucket){
        List<OrderMenu> orderMenus = new ArrayList<>();
        for(Item item : items){
            List<OrderOption> options = new ArrayList<>();
            for(Option option : item.getOptionList()){
                options.add(new OrderOption(option));
            }
            orderMenus.add(new OrderMenu(bucket, item, options));
        }
        return orderMenus;
    }

    // Not using
    @Transactional
    public void updateBucketPaymentState(Long userId, Long bucketId){
        bucketRepository.findByBucketIdAndUserId(bucketId, userId).orElseThrow(
                ()->new BaseException(new ApiError(BucketError.NON_EXIST_BUCKET_USER))
        ).updateState();
    }

    @Transactional
    public void deleteNonpaymentBucket(Bucket bucket){
        orderMenuRepository.deleteAll(orderMenuRepository.findAllByBucket(bucket));
        bucketRepository.delete(bucket);
    }

}
