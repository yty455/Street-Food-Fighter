package com.sff.storeserver.domain.store.controller;

import com.sff.storeserver.ControllerTestSupport;
import com.sff.storeserver.common.utils.ApiResult;
import com.sff.storeserver.common.utils.ApiUtils;
import com.sff.storeserver.domain.store.dto.StoreInfo;
import com.sff.storeserver.domain.store.dto.StoreInfoResponse;
import com.sff.storeserver.domain.store.entity.CategoryType;
import com.sff.storeserver.domain.store.entity.Store;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;

import java.time.LocalTime;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

class StoreControllerTest extends ControllerTestSupport {

    @DisplayName("가게를 저장하고 성공을 반환 받는다..")
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

    @DisplayName("가게를 저장하고 ")
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
                .andExpect(jsonPath("$.response.openTime").value(storeInfo.getOpenTime()))
                .andExpect(jsonPath("$.response.closeTime").value(storeInfo.getCloseTime()))
                .andExpect(jsonPath("$.response.activeArea").value("강서구"))
                .andExpect(jsonPath("$.response.lati").value(48.87373649724122))
                .andExpect(jsonPath("$.response.longi").value(2.2954639195323967))
                .andExpect(jsonPath("$.response.storeUrl").value("www.naver.com"))
                .andExpect(jsonPath("$.response.state").value("생성"));
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
                .lati(48.87373649724122)
                .longi(2.2954639195323967)
                .storeUrl("www.naver.com")
                .state("생성")
                .build();
    }
}