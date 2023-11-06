package com.sff.storeserver.domain.store.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sff.storeserver.domain.store.controller.Svc1FeignClient;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class Svc1FeignService {
    @Autowired
    private Svc1FeignClient svc1FeignClient;

    @Autowired
    private ObjectMapper objectMapper;


    // FeignClient 호출 샘플 메소드
//    private void callApi() {
//        // ResponseBody를 Custom객체로 직접 바인딩
//        ObjectListDto objectList = svc1FeignClient.getSvcList(srch);
//
//            ...
//
//        // 객체를 RequestBody로 전달
//        svc1FeignClient.createSvc(objectDto);
//
//            ...
//
//        // Feign에서 정의한 Response 객체로 바인딩
//        Response response = svc1FeignClient.putSvc(objId, objectReqDto);
//        log.debug("{}", response);
//        log.debug("{}", response.status()); // 상태확인
//        log.debug("{}", response.body()); // response body 확인
//
//        // Response를 Sring타입으로 변환 샘플(NoSQL등에 API Reponse를 Text형태로 저장할 때)
//        String textBody = extractContent(response);
//            ...
//        // objectMapper를 활용해서 String Body를 객체로 변환 샘플
//        ObjectDto objDto = objectMapper.readValue(textBody, ObjectDto.class);
//    }
//
//
//    // Feign Response객체 => String 변환
//    private String extractContent(Response response) {
//        ByteArrayOutputStream output = new ByteArrayOutputStream();
//        try{
//            StreamUtils.copy(response.body().asInputStream(), output);
//        } catch (FileNotFoundException ex) {
//            log.debug("ExtractContent error:", ex);
//            return null;
//        } catch (Exception ex) {
//            log.error("ExtractContent error:", ex);
//            return null;
//        }
//        return new String(output.toByteArray());
//    }
}
