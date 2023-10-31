package com.sff.storeserver.domain.flag.service;

import com.sff.storeserver.domain.flag.repository.FlagRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class FlagService {
    private final FlagRepository flagRepository;
}
