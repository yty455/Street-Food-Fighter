package com.sff.storeserver.domain.store.controller;

import com.sff.storeserver.ControllerTestSupport;
import com.sff.storeserver.common.utils.ApiResult;
import com.sff.storeserver.common.utils.ApiUtils;
import com.sff.storeserver.domain.store.dto.StoreInfo;
import com.sff.storeserver.domain.store.dto.StoreInfoResponse;
import com.sff.storeserver.domain.store.dto.StoreUpdateCategory;
import com.sff.storeserver.domain.store.entity.CategoryType;
import com.sff.storeserver.domain.store.entity.Store;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;

import java.time.LocalTime;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

class StoreControllerTest extends ControllerTestSupport {

    @DisplayName("가게를 저장하고 성공을 반환 받는다.")
    @Test
    void storeAdd() throws Exception {
        // given
        StoreInfo storeInfo = createStore(1L);
        ApiResult<String> result = ApiUtils.success("가게 등록 성공");
        // when // then
        mockMvc.perform(
                        post("/api/store-service/stores")
                                .content(objectMapper.writeValueAsString(storeInfo))
                                .contentType(MediaType.APPLICATION_JSON)
                )
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value("true"))
                .andExpect(jsonPath("$.response").value("가게 등록 성공"));
    }

    @DisplayName("가게번호로 가게를 불러온다.")
    @Test
    void getStore() throws Exception {
        // given
        StoreInfo storeInfo = createStore(1L);
        Store store = storeInfo.toEntity();
        StoreInfoResponse storeInfoResponse = StoreInfoResponse.fromEntity(store);

        // when
        when(storeService.getStore(any())).thenReturn(storeInfoResponse);
        // when // then
        mockMvc.perform(
                        get("/api/store-service/stores/1")
                                .contentType(MediaType.APPLICATION_JSON)
                )
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value("true"))
                .andExpect(jsonPath("$.response.ownerId").value(1L))
                .andExpect(jsonPath("$.response.name").value("붕어빵집 1"))
                .andExpect(jsonPath("$.response.ownerName").value("황재영"))
                .andExpect(jsonPath("$.response.phone").value("010-1234-1234"))
                .andExpect(jsonPath("$.response.category").value("FISHBREAD"))
                .andExpect(jsonPath("$.response.businessCategory").value("포장마차"))
                .andExpect(jsonPath("$.response.information").value("붕어빵집입니다."))
                .andExpect(jsonPath("$.response.introduction").value("붕어빵집 입니다! 어서오세요."))
                .andExpect(jsonPath("$.response.openTime").value("09:00:00"))
                .andExpect(jsonPath("$.response.closeTime").value("11:00:00"))
                .andExpect(jsonPath("$.response.activeArea").value("강서구"))
                .andExpect(jsonPath("$.response.lati").value(48.87373649724122))
                .andExpect(jsonPath("$.response.longi").value(2.2954639195323967))
                .andExpect(jsonPath("$.response.storeUrl").value("www.naver.com"));
    }

    @DisplayName("가게 정보를 수정하고 성공을 반환 받는다.")
    @Test
    void updateStore() throws Exception {
        // given
        StoreInfo storeInfo = createStore(1L);
        ApiResult<String> result = ApiUtils.success("가게 정보 수정을 성공했습니다.");
        // when // then
        mockMvc.perform(
                        patch("/api/store-service/stores/1")
                                .content(objectMapper.writeValueAsString(storeInfo))
                                .contentType(MediaType.APPLICATION_JSON)
                )
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value("true"))
                .andExpect(jsonPath("$.response").value("가게 정보 수정을 성공했습니다."));
    }

    @DisplayName("가제 카테고리,업태를 수정하고 성공을 반환받는다.")
    @Test
    void updateStoreCategory() throws Exception {
        // given
        StoreUpdateCategory storeUpdateCategory = StoreUpdateCategory.builder()
                .category(CategoryType.CHICKEN)
                .businessCategory("포장마차")
                .build();
        ApiResult<String> result = ApiUtils.success("가게 카테고리 수정을 성공했습니다.");

        // when // then
        mockMvc.perform(
                        patch("/api/store-service/stores/categories/1")
                                .content(objectMapper.writeValueAsString(storeUpdateCategory))
                                .contentType(MediaType.APPLICATION_JSON)
                )
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value("true"))
                .andExpect(jsonPath("$.response").value("가게 카테고리 수정을 성공했습니다."));
    }


    StoreInfo createStore(Long ownerId) {
        // 고정된 시간 값 사용
        LocalTime fixedOpenTime = LocalTime.of(9, 0); // 오전 9시
        LocalTime fixedCloseTime = LocalTime.of(11, 0); // 오전 11시
        return StoreInfo.builder()
                .ownerId(ownerId)
                .name("붕어빵집 1")
                .ownerName("황재영")
                .phone("010-1234-1234")
                .category(CategoryType.FISHBREAD)
                .businessCategory("포장마차")
                .information("붕어빵집입니다.")
                .introduction("붕어빵집 입니다! 어서오세요.")
                .openTime(fixedOpenTime)
                .closeTime(fixedCloseTime)
                .activeArea("강서구")
                .lati(48.87373649724122)
                .longi(2.2954639195323967)
                .storeUrl("www.naver.com")
                .build();
    }
}