package com.sff.storeserver.common.feignClient;

import com.sff.storeserver.common.utils.ApiResult;
import com.sff.storeserver.domain.flag.dto.FundingUserDetailInfo;
import com.sff.storeserver.domain.review.dto.ReviewUserInfo;
import com.sff.storeserver.domain.review.dto.ReviewUserInfoRequest;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@FeignClient(name = "userserver", url = "${feign.userserver.url}")
public interface UserClient {

    @PostMapping(value = "/api/user-server/members")
    ApiResult<List<ReviewUserInfo>> getUserInfo(@RequestBody ReviewUserInfoRequest reviewUserInfoRequest);

    @PostMapping(value = "/api/user-server/members")
    ApiResult<List<FundingUserDetailInfo>> getUserFundingInfo(@RequestBody ReviewUserInfoRequest reviewUserInfoRequest);

}
