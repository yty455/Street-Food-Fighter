package com.sff.storeserver;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sff.storeserver.domain.store.controller.MenuController;
import com.sff.storeserver.domain.store.controller.StoreController;
import com.sff.storeserver.domain.store.service.MenuService;
import com.sff.storeserver.domain.store.service.StoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(controllers = {
        StoreController.class,
        MenuController.class
})
public abstract class ControllerTestSupport {
    @Autowired
    protected MockMvc mockMvc;

    @Autowired
    protected ObjectMapper objectMapper;
    @MockBean
    protected StoreService storeService;
    @MockBean
    protected MenuService menuService;
}
