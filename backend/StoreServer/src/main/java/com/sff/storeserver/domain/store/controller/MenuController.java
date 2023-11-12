package com.sff.storeserver.domain.store.controller;

import com.sff.storeserver.common.aop.UserIdHolder;
import com.sff.storeserver.common.aop.UserIdRequired;
import com.sff.storeserver.common.utils.ApiResult;
import com.sff.storeserver.common.utils.ApiUtils;
import com.sff.storeserver.domain.store.dto.MenuInfo;
import com.sff.storeserver.domain.store.dto.MenuInfoResponse;
import com.sff.storeserver.domain.store.service.MenuService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/store-service")
@RequiredArgsConstructor
public class MenuController {
    private final MenuService menuService;

    @Operation(summary = "사장 - 가게 상품 추가", description = "가게 상품을 추가합니다.")
    @PostMapping("/menus")
    @UserIdRequired
    public ApiResult<String> createMenus(UserIdHolder userIdHolder, @Valid @RequestBody MenuInfo menuInfo) {
        menuService.createMenus(menuInfo, userIdHolder.getUserId());
        return ApiUtils.success("상품 추가를 성공했습니다.");
    }

    @Operation(summary = "사장 - 가게 상품 조회", description = "가게 상품을 조회합니다.")
    @GetMapping("/menus")
    @UserIdRequired
    public ApiResult<List<MenuInfoResponse>> getMenus(UserIdHolder userIdHolder) {
        return ApiUtils.success(menuService.getMenus(userIdHolder.getUserId()));
    }

    @Operation(summary = "사장 - 가게 상품 수정", description = "가게 메뉴를 수정합니다.")
    @PutMapping("/menus/{menuId}")
    @UserIdRequired
    public ApiResult<String> addOptions(UserIdHolder userIdHolder, @PathVariable Long menuId, @Valid @RequestBody MenuInfo menuInfo) {
        menuService.updateMenus(menuInfo, menuId, userIdHolder.getUserId());
        return ApiUtils.success("메뉴 수정을 성공했습니다.");
    }

    @Operation(summary = "사장 - 가게 상품 삭제", description = "가게 메뉴를 삭제합니다.")
    @DeleteMapping("/menus/{menuId}")
    @UserIdRequired
    public ApiResult<String> deleteOptions(UserIdHolder userIdHolder, @PathVariable Long menuId) {
        menuService.deleteMenus(menuId, userIdHolder.getUserId());
        return ApiUtils.success("메뉴 삭제를 성공했습니다.");
    }
}
