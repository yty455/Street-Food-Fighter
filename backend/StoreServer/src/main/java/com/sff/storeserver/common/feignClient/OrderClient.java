package com.sff.storeserver.common.feignClient;

import com.sff.storeserver.common.utils.ApiResult;
import com.sff.storeserver.domain.flag.dto.FlagFundingInfo;
import com.sff.storeserver.domain.flag.dto.FlagFundingRequest;
import com.sff.storeserver.domain.flag.dto.FlagNotificationInfo;
import com.sff.storeserver.domain.flag.dto.FundingUserInfo;
import com.sff.storeserver.domain.review.dto.ReviewMenuInfo;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@FeignClient(name = "orderserver", url = "${feign.orderserver.url}")
public interface OrderClient {
    @GetMapping(value = "/api/order-server/{orderId}")
    ApiResult<Long> getStoreId(@PathVariable Long orderId);

    @PostMapping(value = "/api/order-server/menus")
    ApiResult<List<ReviewMenuInfo>> getMenus(@RequestBody List<Long> orderIds);

    @PostMapping(value = "/api/order-server/fundings/flags")
    ApiResult<List<FlagFundingInfo>> getFundingAmount(@RequestBody FlagFundingRequest flagFundingRequest);

    @PutMapping(value = "/api/order-server/fundings/chosen")
    ApiResult<?> notifyFlag(@RequestBody FlagNotificationInfo flagNotificationInfo);

    @GetMapping(value = "/api/order-server/fundings/flags/{flagId}/users")
    ApiResult<List<FundingUserInfo>> getFundingUsers(@PathVariable Long flagId);
}
