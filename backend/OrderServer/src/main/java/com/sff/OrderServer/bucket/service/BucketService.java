package com.sff.OrderServer.bucket.service;

import com.sff.OrderServer.bucket.dto.Item;
import com.sff.OrderServer.bucket.dto.Option;
import com.sff.OrderServer.bucket.entity.Bucket;
import com.sff.OrderServer.bucket.entity.OrderMenu;
import com.sff.OrderServer.bucket.entity.OrderOption;
import com.sff.OrderServer.bucket.repository.BucketRepository;
import com.sff.OrderServer.bucket.repository.OrderMenuRepository;
import com.sff.OrderServer.error.code.BucketError;
import com.sff.OrderServer.error.type.BaseException;
import com.sff.OrderServer.utils.ApiError;
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

    // Bucket 생성 및 OrderMenu, OrderOption 저장
    @Transactional
    public Bucket createBucket(Long userId, List<Item> items){
        Optional<Bucket> tempBucket = bucketRepository.findByUserIdAndPaymentStateFalse(userId);
        tempBucket.ifPresent(this::deleteNonpaymentBucket);

        Bucket bucket = new Bucket(userId, getTotalPrice(items));

        bucketRepository.save(bucket);

        orderMenuRepository.saveAll(getOrderMenuList(items, bucket));
        return bucket;
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
