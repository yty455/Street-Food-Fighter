package com.sff.storeserver.domain.store.service;

import com.sff.storeserver.IntegrationTestSupport;
import com.sff.storeserver.domain.store.dto.StoreInfo;
import com.sff.storeserver.domain.store.dto.StoreInfoResponse;
import com.sff.storeserver.domain.store.dto.StoreUpdateInfo;
import com.sff.storeserver.domain.store.entity.CategoryType;
import com.sff.storeserver.domain.store.entity.Store;
import com.sff.storeserver.domain.store.repository.StoreRepository;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyDouble;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class StoreServiceTest extends IntegrationTestSupport {
    @Mock
    private StoreRepository storeRepository;
    @InjectMocks
    private StoreService storeService;

    @DisplayName("가게정보를 통해 가게를 생성한다.")
    @Disabled("Reposiotory 테스트로 옮길예정")
    @Test
    void createStoreByInfo() {
        // given
        StoreInfo storeInfo = createStore(1L);

        //when
        storeService.createStore(storeInfo);
        Store store = storeRepository.findByOwnerId(1L).orElseThrow();

        //then
        assertThat(store.getOwnerId()).isEqualTo(1L);
    }

    @DisplayName("사장ID를 통해 가게정보를 가져온다.")
    @Test
    void getStoreByStoreId() {
        // given
        StoreInfo storeInfo = createStore(1L);
        Store store = storeInfo.toEntity();
        when(storeRepository.findByOwnerId(any())).thenReturn(Optional.ofNullable(store));

        // when
        StoreInfoResponse storeInfoResponse = storeService.getStore(1L);

        // then
        assertThat(storeInfoResponse.getOwnerId()).isEqualTo(storeInfo.getOwnerId());
    }

    @DisplayName("사장ID를 가게 정보를 수정한다.")
    @Disabled
    @Test
    void updateStoreByOwnerId() {
        // given
        Long ownerId = 2L;
        StoreInfo storeInfo = createStore(ownerId);
        Store store = storeInfo.toEntity();
        StoreUpdateInfo storeUpdateInfo = StoreUpdateInfo.builder()
                .name("변경된 가게이름")
                .ownerName("변경된 사장이름")
                .phone("010-1111-1111")
                .openTime(LocalTime.now())
                .closeTime(LocalTime.now())
                .information("변경된 설명")
                .introduction("변경된 안내")
                .build();

        // when
        storeRepository.save(store);
        storeService.updateStore(storeUpdateInfo, ownerId);

        Store store1 = storeRepository.findByOwnerId(ownerId).orElseThrow();

        // then
        assertAll(
                () -> assertThat(store1.getName()).isEqualTo(storeUpdateInfo.getName()),
                () -> assertThat(store1.getOwnerName()).isEqualTo(storeUpdateInfo.getOwnerName()),
                () -> assertThat(store1.getPhone()).isEqualTo(storeUpdateInfo.getPhone()),
                () -> assertThat(store1.getOpenTime()).isEqualTo(storeUpdateInfo.getOpenTime()),
                () -> assertThat(store1.getCloseTime()).isEqualTo(storeUpdateInfo.getCloseTime()),
                () -> assertThat(store1.getInformation()).isEqualTo(storeUpdateInfo.getInformation()),
                () -> assertThat(store1.getIntroduction()).isEqualTo(storeUpdateInfo.getIntroduction())
        );
    }

    @DisplayName("현재 좌표기준에서 근처 가게를 찾는다.")
    @Test
    void getStoreByLaitAndLongi() {
        // given
        StoreInfo storeInfo = createStore(1L);
        Store store = storeInfo.toEntity();
        StoreInfo storeInfo2 = createStore(2L, 48.87373649724123, 2.2954639195323968);
        Store store2 = storeInfo.toEntity();
        List<Store> storeList = Arrays.asList(store, store2);
        List<CategoryType> arr = Arrays.asList(CategoryType.FISHBREAD);

        // when
        when(storeRepository.findNearStore(anyDouble(), anyDouble())).thenReturn(storeList);

        List<StoreInfoResponse> stores = storeService.getNearStore(48.87373649724123, 2.2954639195323968, arr);

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