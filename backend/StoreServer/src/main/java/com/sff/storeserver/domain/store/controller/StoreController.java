package com.sff.storeserver.domain.store.controller;

import com.sff.storeserver.common.BasicResponse;
import com.sff.storeserver.domain.store.dto.StoreInfo;
import com.sff.storeserver.domain.store.service.StoreService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.geo.Point;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@Tag(name = "가게 API", description = "가게 관련 API")
@RestController
@RequiredArgsConstructor
public class StoreController {

    private final StoreService storeService;

    @Operation(summary = "사장 - 가게 등록", description = "사장 회원가입시 가게를 등록합니다.")
    @PostMapping("/api/owner/store")
    public ResponseEntity<BasicResponse> registerStore(@RequestBody StoreInfo storeInfo) {

        storeService.registerStore(storeInfo);

        BasicResponse basicResponse = BasicResponse.builder()
                .message("가계 등록 성공")
                .build();

        return new ResponseEntity<>(basicResponse, basicResponse.getHttpStatus());
    }

    @Operation(summary = "사장 - 가게 정보 조회", description = "가게 정보를 조회합니다.")
    @GetMapping("/api/owner/store")
    public ResponseEntity<BasicResponse> getStore(@RequestBody Long ownerId) {

        storeService.getStore(ownerId);

        BasicResponse basicResponse = BasicResponse.builder()
                .message("가계 등록 성공")
                .build();

        return new ResponseEntity<>(basicResponse, basicResponse.getHttpStatus());
    }

    @Operation(summary = "사장 - 가게 정보 수정", description = "가게 정보를 수정합니다.")
    @PatchMapping("/api/owner/store")
    public ResponseEntity<BasicResponse> modifyStore(@RequestBody StoreInfo storeInfo) {

        storeService.modifyStore(storeInfo);

        BasicResponse basicResponse = BasicResponse.builder()
                .message("가계 등록 성공")
                .build();

        return new ResponseEntity<>(basicResponse, basicResponse.getHttpStatus());
    }

    @Operation(summary = "손님 - 내 근처 가게 조회 성공", description = "내 근처 가게 조회합니다.")
    @GetMapping("/api/user/store")
    public ResponseEntity<BasicResponse> getNearStore(@RequestParam("latitude") double latitude,
                                                      @RequestParam("longitude") double longitude,
                                                      @RequestParam("categories") List<String> categories) {
        storeService.getNearStore(new Point(latitude, longitude), categories);

        BasicResponse basicResponse = BasicResponse.builder()
                .message("내 근처 가게 조회 성공")
                .build();

        return new ResponseEntity<>(basicResponse, basicResponse.getHttpStatus());
    }

    @Operation(summary = "손님 - 펀딩 정보 조회", description = "내 근처 펀딩 조회합니다.")
    @GetMapping("/api/user/flag")
    public ResponseEntity<BasicResponse> getNearFlag(@RequestParam("date") Date date,
                                                     @RequestParam("latitude") double latitude,
                                                     @RequestParam("longitude") double longitude,
                                                     @RequestParam("categories") List<String> categories) {
        storeService.getNearFlag(date, new Point(latitude, longitude), categories);

        BasicResponse basicResponse = BasicResponse.builder()
                .message("내 근처 펀딩 조회 성공")
                .build();

        return new ResponseEntity<>(basicResponse, basicResponse.getHttpStatus());
    }



}
