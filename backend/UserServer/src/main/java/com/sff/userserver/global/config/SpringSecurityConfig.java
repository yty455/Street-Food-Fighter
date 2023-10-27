package com.sff.userserver.global.config;

import static org.springframework.security.config.Customizer.*;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.CsrfConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import jakarta.servlet.DispatcherType;

@Configuration
@EnableMethodSecurity
public class SpringSecurityConfig {

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http.csrf(CsrfConfigurer::disable).cors(withDefaults())
				.authorizeHttpRequests(request -> request
						.dispatcherTypeMatchers(DispatcherType.FORWARD).permitAll()
						.requestMatchers("/status", "images/**", "/view/join", "/auth/join").permitAll()
						.anyRequest().authenticated()
				)
				.formLogin(login -> login
						// .loginPage("/view/login") // 커스텀 로그인 페이지 지정
						.loginProcessingUrl("/login-process") // submit 받을 url
						.usernameParameter("userid") // submit 할 아이디
						.passwordParameter("pw") // submit 할 비밀번호
						.defaultSuccessUrl("/view/dashboard", true)
						.permitAll()
				)
				.logout(withDefaults());
		return http.build();
	}
}
