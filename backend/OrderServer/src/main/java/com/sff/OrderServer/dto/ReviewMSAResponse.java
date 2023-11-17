package com.sff.OrderServer.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ReviewMSAResponse {

    private Long reviewId;
    private Long userId;
    private Integer score;
    private String content;

}
