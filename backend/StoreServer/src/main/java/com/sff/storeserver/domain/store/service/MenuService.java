package com.sff.storeserver.domain.store.service;

import com.sff.storeserver.common.error.code.MenuError;
import com.sff.storeserver.common.error.code.StoreError;
import com.sff.storeserver.common.error.type.BaseException;
import com.sff.storeserver.domain.store.dto.MenuInfo;
import com.sff.storeserver.domain.store.dto.MenuInfoResponse;
import com.sff.storeserver.domain.store.entity.Menu;
import com.sff.storeserver.domain.store.entity.Store;
import com.sff.storeserver.domain.store.repository.MenuRepository;
import com.sff.storeserver.domain.store.repository.StoreRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class MenuService {
    private final MenuRepository menuRepository;
    private final StoreRepository storeRepository;

    public void createMenus(MenuInfo menuInfo, Long ownerId) {

        Store store = storeRepository.findByOwnerId(ownerId).orElseThrow(() ->
                new BaseException(StoreError.NOT_FOUND_STORE)
        );
        Menu menu = menuInfo.toEntity();
        menu.addStore(store);
        menuRepository.save(menu);
    }

    public List<MenuInfoResponse> getMenus(Long ownerId) {
        Store store = storeRepository.findByOwnerId(ownerId).orElseThrow(() ->
                new BaseException(StoreError.NOT_FOUND_STORE));
        List<Menu> menus = menuRepository.findByStoreId(store.getId());
        return menus.stream().map(MenuInfoResponse::fromEntity).toList();
    }

    public void updateMenus(MenuInfo menuInfo, Long menuId, Long ownerId) {
        Menu menu = menuRepository.findById(menuId).orElseThrow(() ->
                new BaseException(MenuError.NOT_FOUND_MENU)
        );
        if (menu.getStore().getOwnerId() != ownerId) {
            throw new BaseException(MenuError.NOT_STORE_OWNER);
        }
        menu.updateMenu(menuInfo);
    }

    public void deleteMenus(Long menuId, Long ownerId) {
        Menu menu = menuRepository.findById(menuId).orElseThrow(() ->
                new BaseException(MenuError.NOT_FOUND_MENU));
        if (menu.getStore().getOwnerId() != ownerId) {
            throw new BaseException(MenuError.NOT_STORE_OWNER);
        }
        menu.delete();
    }
}
