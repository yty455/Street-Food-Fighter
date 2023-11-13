package com.sff.storeserver.domain.flag.service;

import com.sff.storeserver.common.feignClient.PayClient;
import com.sff.storeserver.domain.flag.dto.FlagNotificationInfo;
import com.sff.storeserver.domain.flag.entity.Flag;
import com.sff.storeserver.domain.flag.entity.FlagType;
import com.sff.storeserver.domain.flag.repository.FlagRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class FlagScheduler {
    private final FlagRepository flagRepository;
    private final PayClient payClient;

    @Scheduled(cron = "0 0 3 * * ?")
    @Transactional
    public void flagManager() {
        // 어제 날짜 펀딩 모두 불러 와서 사용안한 애들 펀딩 실패 처리
        LocalDate yesterday = LocalDate.now().minusDays(1);
        List<Flag> flagList = flagRepository.findByDateAndState(yesterday, FlagType.WAITING);
        payClient.notifyFlag(FlagNotificationInfo.builder().unpickedFlagIds(flagList.stream().map(Flag::getId).toList()).build());
        flagList.forEach(Flag::fundingFailed);
    }
}
