package com.sff.OrderServer.bucket.dto;

import com.sff.OrderServer.bucket.entity.OrderOption;
import java.util.ArrayList;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Item {
    private Long menuId;
    private String name;
    private Integer price;
    private String menuUrl;
    private Integer count;
    private List<Option> optionList;
}
