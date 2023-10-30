package com.sff.storeserver;

import com.sff.storeserver.domain.store.controller.StoreController;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;

@WebMvcTest(controllers = {
        StoreController.class
})
public abstract class ControllerTestSupport {

}
