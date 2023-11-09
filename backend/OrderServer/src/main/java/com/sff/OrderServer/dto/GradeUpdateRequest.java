package com.sff.OrderServer.dto;

import com.sff.OrderServer.order.dto.OrderPerUser;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GradeUpdateRequest {

    private List<OrderPerUser> gradeUpdateRequests;

}
