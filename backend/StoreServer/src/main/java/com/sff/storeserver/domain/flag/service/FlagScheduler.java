package com.sff.storeserver.domain.flag.service;

import com.sff.storeserver.domain.flag.entity.Flag;
import com.sff.storeserver.domain.flag.entity.FlagType;
import com.sff.storeserver.domain.flag.repository.FlagRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class FlagScheduler {

    private final FlagRepository flagRepository;

    // TODO - 어제 사용 안한 깃발들 전부 펀딩 실패, 펀딩 3개중 1개 사용하면 나머지 2개 바로 펀딩 실패(영업시작에서 처리하기)
    @Scheduled(cron = "0 0 1 * * ?")
    public void flagManager() {
        // 어제 날짜 펀딩 모두 불러 와서 사용안한 애들 펀딩 실패 처리
        LocalDate yesterDay = LocalDate.now();
        List<Flag> flagList = flagRepository.findByDate(yesterDay);
        flagList.forEach(this::fundingFailed);
    }

    public void fundingFailed(Flag flag) {
        if (flag.getState().equals(FlagType.WAITING)) {
            flag.fundingFailed();
        }
        // 펀딩 실패 알림 요청 -> 깃발 아이디 주문 서비스에 보내면 내 깃발에 펀딩한 회원들에게 펀딩 실패 알림 보내기.
    }
}
