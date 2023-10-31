package com.sff.storeserver.domain.store.service;

import com.sff.storeserver.IntegrationTestSupport;
import com.sff.storeserver.domain.store.dto.StoreInfo;
import com.sff.storeserver.domain.store.dto.StoreInfoResponse;
import com.sff.storeserver.domain.store.entity.CategoryType;
import com.sff.storeserver.domain.store.entity.Store;
import com.sff.storeserver.domain.store.repository.StoreRepository;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalTime;
import java.util.Arrays;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@Transactional
class StoreServiceTest extends IntegrationTestSupport {
    @Autowired
    private StoreRepository storeRepository;
    @Autowired
    private StoreService storeService;
    @Autowired
    private EntityManager em;

    @DisplayName("가게정보를 통해 가게를 생성한다.")
    @Test
    void createStoreByInfo() {
        // given
        StoreInfo storeInfo = createStore(1L);

        //when
        storeService.createStore(storeInfo);
        Store store = storeRepository.findByOwnerId(1L);

        //then
        assertThat(store.getOwnerId()).isEqualTo(1L);
    }

    @DisplayName("사장ID를 통해 가게정보를 가져온다.")
    @Test
    void getStoreByStoreId() {
        // given
        StoreInfo storeInfo = createStore(1L);
        Store store = storeInfo.toEntity();
        storeRepository.save(store);

        // when
        StoreInfoResponse storeInfoResponse = storeService.getStore(1L);

        // then
        assertThat(storeInfoResponse.getOwnerId()).isEqualTo(storeInfo.getOwnerId());
    }

    @DisplayName("현재 좌표기준에서 근처 가게를 찾는다.")
    @Test
    void getStoreByLaitAndLongi() {
        // given
        StoreInfo storeInfo = createStore(1L);
        Store store = storeInfo.toEntity();
        storeRepository.save(store);
        StoreInfo storeInfo2 = createStore(2L, 48.87373649724123, 2.2954639195323968);
        Store store2 = storeInfo.toEntity();
        storeRepository.save(store2);
        List<CategoryType> arr = Arrays.asList(CategoryType.FISHBREAD);

        // when
        List<StoreInfoResponse> stores = storeService.getNearStore(48.87373649724123, 2.2954639195323968, arr);
        System.out.println(stores.size());
        stores.forEach(prev -> {
            System.out.println(prev.getLongi());
            System.out.println(prev.getLati());
        });
        // then
        assertThat(stores.size()).isEqualTo(2);
    }

    StoreInfo createStore(Long ownerId) {
        return StoreInfo.builder()
                .ownerId(ownerId)
                .name("붕어빵집 1")
                .ownerName("황재영")
                .phone("010-1234-1234")
                .category(CategoryType.FISHBREAD)
                .businessCategory("포장마차")
                .information("붕어빵집입니다.")
                .introduction("붕어빵집 입니다! 어서오세요.")
                .openTime(LocalTime.now())
                .closeTime(LocalTime.now().plusHours(2L))
                .activeArea("강서구")
//                .areaPoint(new Point(48.87373649724122, 2.2954639195323967))
                .lati(48.87373649724122)
                .longi(2.2954639195323967)
                .storeUrl("www.naver.com")
                .state("생성")
                .build();
    }

    StoreInfo createStore(Long ownerId, double lati, double longi) {
        return StoreInfo.builder()
                .ownerId(ownerId)
                .name("붕어빵집 1")
                .ownerName("황재영")
                .phone("010-1234-1234")
                .category(CategoryType.FISHBREAD)
                .businessCategory("포장마차")
                .information("붕어빵집입니다.")
                .introduction("붕어빵집 입니다! 어서오세요.")
                .openTime(LocalTime.now())
                .closeTime(LocalTime.now().plusHours(10L))
                .activeArea("강서구")
//                .areaPoint(new Point(48.87373649724122, 2.2954639195323967))
                .lati(lati)
                .longi(longi)
                .storeUrl("www.naver.com")
                .state("생성")
                .build();
    }


}