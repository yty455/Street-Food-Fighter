package com.sff.storeserver;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.sql.Statement;

@SpringBootApplication
public class StoreServerApplication  {

    public static void main(String[] args) {
        SpringApplication.run(StoreServerApplication.class, args);
    }


}
