package com.sff.OrderServer.bucket.service;

import com.sff.OrderServer.bucket.dto.Option;
import com.sff.OrderServer.bucket.entity.OrderOption;
import com.sff.OrderServer.bucket.repository.OrderOptionRepository;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OrderOptionService {
    private final OrderOptionRepository orderOptionRepository;

}
