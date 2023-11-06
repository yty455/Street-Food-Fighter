package com.sff.PaymentServer.infra;

import com.sff.PaymentServer.dto.OrderCreateRequest;
import com.sff.PaymentServer.utils.ApiResult;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "orderClient", url = "${spring.data.Order_Server}")
public interface OrderClient {

    @PostMapping(value = "/api/order-server/user/orders")
    ApiResult createOrderRecord(@RequestBody OrderCreateRequest orderCreateRequest);
}
