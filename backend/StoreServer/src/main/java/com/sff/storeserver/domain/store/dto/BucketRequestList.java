package com.sff.storeserver.domain.store.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class BucketRequestList {
    public List<BucketRequest> bucketRequestList;
}
