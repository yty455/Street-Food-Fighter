package com.sff.storeserver.domain.store.controller;

import com.sff.storeserver.common.utils.ApiResult;
import com.sff.storeserver.common.utils.ApiUtils;
import com.sff.storeserver.domain.store.dto.*;
import com.sff.storeserver.domain.store.entity.CategoryType;
import com.sff.storeserver.domain.store.service.StoreService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@Tag(name = "가게 API", description = "가게 관련 API")
@RestController
@RequestMapping("/api/store-service")
@RequiredArgsConstructor
public class StoreController {

    private final StoreService storeService;

    @Operation(summary = "사장 - 가게 등록", description = "사장 회원가입시 가게를 등록합니다.")
    @PostMapping("/stores")
    public ApiResult<String> registerStore(@Valid @RequestBody StoreInfo storeInfo) {
        storeService.createStore(storeInfo);
        return ApiUtils.success("가게 등록 성공");
    }

    @Operation(summary = "사장 - 가게 정보 조회", description = "가게 정보를 조회합니다.")
    @GetMapping("/stores/{ownerId}")
    public ApiResult<StoreInfoResponse> getStore(@PathVariable Long ownerId) {
        StoreInfoResponse storeInfoResponse = storeService.getStore(ownerId);
        return ApiUtils.success(storeInfoResponse);
    }


    @GetMapping("/stores")
    public ApiResult<List<StoreInfoResponse>> getStoreByStoreId(@RequestParam List<Long> ids) {
        return ApiUtils.success(storeService.getStores(ids));

    @Operation(summary = "손님 - 가게 정보 상세 조회", description = "손님이 가게 정보를 상세 조회합니다.")
    @GetMapping("/stores/{storeId}/detail")
    public ApiResult<StoreDetailResponse> getStoreDetail(@PathVariable Long storeId) {
        StoreDetailResponse storeDetailResponse = storeService.getStoreDetail(storeId);
        return ApiUtils.success(storeDetailResponse);
    }

    @Operation(summary = "사장 - 가게 정보 수정", description = "가게 정보를 수정합니다.")
    @PatchMapping("/stores/{ownerId}")
    public ApiResult<String> updateStore(@PathVariable Long ownerId, @RequestBody StoreUpdateInfo storeUpdateInfo) {
        storeService.updateStore(storeUpdateInfo, ownerId);
        return ApiUtils.success("가게 정보 수정을 성공했습니다.");
    }

    @Operation(summary = "사장 - 가게 카테고리, 업태 수정", description = "가게 카테고리, 업태를 수정합니다.")
    @PatchMapping("/stores/categories/{ownerId}")
    public ApiResult<String> updateStoreCategory(@PathVariable Long ownerId, @RequestBody StoreUpdateCategory storeUpdateCategory) {
        storeService.updateStoreCategory(storeUpdateCategory, ownerId);
        return ApiUtils.success("가게 카테고리 수정을 성공했습니다.");
    }

    @Operation(summary = "사장 - 사장님 회원 탈퇴", description = "사장님 회원 탈퇴")
    @DeleteMapping("/stores/{ownerId}")
    public ApiResult<String> deleteStore(@PathVariable Long ownerId) {

        storeService.deleteStore(ownerId);

        return ApiUtils.success("가게 정보 삭제 완료");
    }


    @Operation(summary = "손님 - 내 근처 가게 조회 성공", description = "내 근처 가게 조회합니다.")
    @GetMapping("/stores/near")
    public ApiResult<?> getNearStore(@RequestParam("lati") double lati,
                                     @RequestParam("longi") double longi,
                                     @RequestParam("categories") List<CategoryType> categories) {
        List<StoreInfoResponse> stores = storeService.getNearStore(lati, longi, categories);
        return ApiUtils.success(stores);
    }

    @Operation(summary = "손님 - 펀딩 정보 조회", description = "내 근처 펀딩 조회합니다.")
    @GetMapping("/flag/near")
    public ApiResult<?> getNearFlag(@RequestParam("date") LocalDate date,
                                    @RequestParam("lati") double lati,
                                    @RequestParam("longi") double longi,
                                    @RequestParam("categories") List<CategoryType> categories) {
        List<StoreInfoResponse> stores = storeService.getNearFlag(date, lati, longi, categories);
        return ApiUtils.success(stores);
    }

    @Operation(summary = "사장 - 가게 영업 시작", description = "가게 영업을 시작합니다. (깃발 선택 가능)")
    @PostMapping("/store/{ownerId}/business")
    public ApiResult<String> startBusiness(@PathVariable Long ownerId, @RequestParam Long flagId) {

        storeService.startBusiness(ownerId, flagId);

        return ApiUtils.success("가게 영업 시작");
    }

    @Operation(summary = "사장 - 가게 영업 종료", description = "가게 영업을 종료합니다.")
    @DeleteMapping("/store/{ownerId}/business")
    public ApiResult<String> closeBusiness(@PathVariable Long ownerId) {

        storeService.closeBusiness(ownerId);

        return ApiUtils.success("가게 영업 종료");
    }

}
