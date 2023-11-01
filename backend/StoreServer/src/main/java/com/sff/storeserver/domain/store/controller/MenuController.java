package com.sff.storeserver.domain.store.controller;

import com.sff.storeserver.common.utils.ApiResult;
import com.sff.storeserver.common.utils.ApiUtils;
import com.sff.storeserver.domain.store.dto.MenuInfo;
import com.sff.storeserver.domain.store.dto.MenuInfoResponse;
import com.sff.storeserver.domain.store.service.MenuService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/store-service")
@RequiredArgsConstructor
public class MenuController {
    private final MenuService menuService;

    @PostMapping("/menus/{storeId}")
    public ApiResult<String> createMenus(@PathVariable Long storeId, @Valid @RequestBody MenuInfo menuInfo) {
        menuService.createMenus(menuInfo, storeId);
        return ApiUtils.success("상품 추가를 성공했습니다.");
    }

    @GetMapping("/menus/{storeId}")
    public ApiResult<List<MenuInfoResponse>> getMenus(@PathVariable Long storeId) {
        return ApiUtils.success(menuService.getMenus(storeId));
    }

}
