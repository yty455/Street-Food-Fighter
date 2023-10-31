package com.sff.storeserver.domain.store.service;

import com.sff.storeserver.domain.store.dto.MenuInfo;
import com.sff.storeserver.domain.store.repository.MenuRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MenuService {
    private final MenuRepository menuRepository;

    public void createMenus(MenuInfo menuInfo) {

    }
}
