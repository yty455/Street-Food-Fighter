package com.sff.storeserver.domain.flag.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FlagNotificationInfo {

    private Long pickedFlagId;
    private List<Long> unpickedFlagIds = new ArrayList<>();

    public void updatePicked(Long pickedFlagId) {
        this.pickedFlagId = pickedFlagId;
    }

    public void updateUnpicked(Long unpickedFlagId) {
        unpickedFlagIds.add(unpickedFlagId);
    }

}
