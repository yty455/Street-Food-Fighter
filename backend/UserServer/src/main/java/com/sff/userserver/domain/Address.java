package com.sff.userserver.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Embeddable
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Address {
	@Column(name = "REGION_1DEPTH_NAME")
	private String region1;
	@Column(name = "REGION_2DEPTH_NAME")
	private String region2;
	@Column(name = "REGION_3DEPTH_NAME")
	private String region3;
	@Column(name = "REGION_4DEPTH_NAME")
	private String region4;

	public Address(String region1, String region2, String region3) {
		this.region1 = region1;
		this.region2 = region2;
		this.region3 = region3;
	}

	public Address(String region1, String region2, String region3, String region4) {
		new Address(region1, region2, region3);
		this.region4 = region4;
	}
}
