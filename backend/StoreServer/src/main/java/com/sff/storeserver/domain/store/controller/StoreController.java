package com.sff.storeserver.domain.store.controller;

import com.sff.storeserver.common.BasicResponse;
import com.sff.storeserver.common.utils.ApiResult;
import com.sff.storeserver.common.utils.ApiUtils;
import com.sff.storeserver.domain.store.dto.StoreInfo;
import com.sff.storeserver.domain.store.dto.StoreInfoResponse;
import com.sff.storeserver.domain.store.entity.Store;
import com.sff.storeserver.domain.store.service.StoreService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.geo.Point;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
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
    @GetMapping("/stores")
    public ApiResult<StoreInfoResponse> getStore(@RequestBody Long ownerId) {
        StoreInfoResponse storeInfoResponse = storeService.getStore(ownerId);
        return ApiUtils.success(storeInfoResponse);
    }

    @Operation(summary = "사장 - 가게 정보 수정", description = "가게 정보를 수정합니다.")
    @PatchMapping("/stores/{storeId}")
    public ResponseEntity<BasicResponse> modifyStore(@PathVariable Long storeId, @RequestBody StoreInfo storeInfo) {

        storeService.modifyStore(storeInfo);

        BasicResponse basicResponse = BasicResponse.builder()
                .message("가계 등록 성공")
                .build();

        return new ResponseEntity<>(basicResponse, basicResponse.getHttpStatus());
    }

    @Operation(summary = "손님 - 내 근처 가게 조회 성공", description = "내 근처 가게 조회합니다.")
    @GetMapping("/stores/near/{lati}/{longi}")
    public ResponseEntity<BasicResponse> getNearStore(@PathVariable double lati,
                                                      @PathVariable double longi,
                                                      @RequestParam("categories") List<String> categories) {
        List<StoreInfoResponse> stores = storeService.getNearStore(lati, longi, categories);

        BasicResponse basicResponse = BasicResponse.builder()
                .message("내 근처 가게 조회 성공")
                .build();

        return new ResponseEntity<>(basicResponse, basicResponse.getHttpStatus());
    }

    @Operation(summary = "손님 - 펀딩 정보 조회", description = "내 근처 펀딩 조회합니다.")
    @GetMapping("/funding/near")
    public ResponseEntity<BasicResponse> getNearFlag(@RequestParam("date") Date date,
                                                     @RequestParam("latitude") double latitude,
                                                     @RequestParam("longitude") double longitude,
                                                     @RequestParam("categories") List<String> categories) {
        List<Store> stores = storeService.getNearFlag(date, new Point(latitude, longitude), categories);
        BasicResponse basicResponse = BasicResponse.builder()
                .message("내 근처 펀딩 조회 성공")
                .build();
        return new ResponseEntity<>(basicResponse, basicResponse.getHttpStatus());
    }

}
