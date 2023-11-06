package com.sff.storeserver;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
//@EnableJpaAuditing
@EnableScheduling
public class StoreServerApplication {

    public static void main(String[] args) {
        SpringApplication.run(StoreServerApplication.class, args);
    }


}
