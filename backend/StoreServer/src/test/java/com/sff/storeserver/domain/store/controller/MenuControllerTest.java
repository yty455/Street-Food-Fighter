package com.sff.storeserver.domain.store.controller;

import com.sff.storeserver.ControllerTestSupport;
import com.sff.storeserver.domain.store.dto.MenuInfo;
import com.sff.storeserver.domain.store.dto.MenuInfoResponse;
import com.sff.storeserver.domain.store.dto.OptionInfo;
import com.sff.storeserver.domain.store.entity.Menu;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;

import java.util.Arrays;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

class MenuControllerTest extends ControllerTestSupport {

    @DisplayName("메뉴를 저장하고 성공을 반환 받는다.")
    @Test
    void storeAdd() throws Exception {
        // given
        MenuInfo menuInfo = createMenu();
        // when // then
        mockMvc.perform(
                        post("/api/store-service/menus/1")
                                .content(objectMapper.writeValueAsString(menuInfo))
                                .contentType(MediaType.APPLICATION_JSON)
                )
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value("true"))
                .andExpect(jsonPath("$.response").value("상품 추가를 성공했습니다."));
    }

    @DisplayName("가게 ID를 통해서 메뉴를 조회한다.")
    @Test
    void getMenusByStoreId() throws Exception {
        // given
        MenuInfo menuInfo = createMenu();
        Menu menu = menuInfo.toEntity();
        MenuInfoResponse menuInfoResponse = MenuInfoResponse.fromEntity(menu);
        List<MenuInfoResponse> menuInfoResponseList = Arrays.asList(menuInfoResponse);

        when(menuService.getMenus(any())).thenReturn(menuInfoResponseList);


        // when // then
        mockMvc.perform(
                        get("/api/store-service/menus/1")
                                .contentType(MediaType.APPLICATION_JSON)
                )
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value("true"))
                .andExpect(jsonPath("$.response[0].name").value("메뉴 이름"))
                .andExpect(jsonPath("$.response[0].price").value(100000))
                .andExpect(jsonPath("$.response[0].optionInfoList[0].name").value("옵션"))
                .andExpect(jsonPath("$.response[0].optionInfoList[0].price").value(10000));
    }

    MenuInfo createMenu() {
        // 고정된 시간 값 사용
        List<OptionInfo> optionInfoList = Arrays.asList(createOptions(), createOptions());
        return MenuInfo.builder()
                .name("메뉴 이름")
                .price(100000)
                .menuUrl("URL")
                .optionInfoList(optionInfoList)
                .build();
    }

    OptionInfo createOptions() {
        return OptionInfo.builder()
                .name("옵션")
                .price(10000)
                .build();
    }

}