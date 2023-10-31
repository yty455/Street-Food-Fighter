package com.sff.storeserver.domain.store.controller;

import com.sff.storeserver.ControllerTestSupport;
import com.sff.storeserver.common.utils.ApiResult;
import com.sff.storeserver.common.utils.ApiUtils;
import com.sff.storeserver.domain.store.dto.StoreInfo;
import com.sff.storeserver.domain.store.entity.CategoryType;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;

import java.time.LocalTime;

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