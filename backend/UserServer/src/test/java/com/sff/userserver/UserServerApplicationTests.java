package com.sff.userserver;

import static org.assertj.core.api.Assertions.*;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@SpringBootTest
class UserServerApplicationTests {

	@Test
	void contextLoads() {
	}

	@Test
	void 헬스체크() {
		TestRestTemplate rest = new TestRestTemplate();
		ResponseEntity<String> res = rest.getForEntity("http://localhost:8080/status1", String.class);

		assertThat(res.getStatusCode()).isEqualTo(HttpStatus.OK);
	}

}
