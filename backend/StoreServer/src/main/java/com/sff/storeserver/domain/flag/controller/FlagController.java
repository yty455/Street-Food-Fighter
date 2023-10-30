package com.sff.storeserver.domain.flag.controller;

import com.sff.storeserver.domain.flag.service.FlagService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/store-service")
@RequiredArgsConstructor
public class FlagController {
    private final FlagService flagService;
}
