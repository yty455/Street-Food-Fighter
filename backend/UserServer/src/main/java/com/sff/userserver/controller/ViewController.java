package com.sff.userserver.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.sff.userserver.config.OwnerAuthorize;
import com.sff.userserver.config.UserAuthorize;

@Controller
@RequestMapping("/view")
public class ViewController {

	@GetMapping("/login")
	public String loginPage() {
		return "login";
	}

	@GetMapping("/join")
	public String joinPage() {
		return "join";
	}

	// @GetMapping("/dashboard")
	// public String dashboardPage(@AuthenticationPrincipal User user) {
	// 	// model.addAttribute("loginId", user.getUsername());
	// 	// model.addAttribute("loginRoles", user.getAuthorities());
	// 	return "dashboard";
	// }

	@GetMapping("/setting/owner")
	@OwnerAuthorize
	public String adminSettingPage() {
		return "owner_setting";
	}

	@GetMapping("/setting/user")
	@UserAuthorize
	public String userSettingPage() {
		return "user_setting";
	}
}
