package com.sff.PaymentServer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class PaymentServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(PaymentServerApplication.class, args);
	}

}
