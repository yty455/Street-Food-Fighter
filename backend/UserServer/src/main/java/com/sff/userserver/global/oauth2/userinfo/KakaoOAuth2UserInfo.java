package com.sff.userserver.global.oauth2.userinfo;

import java.util.Map;

public class KakaoOAuth2UserInfo extends OAuth2UserInfo {

    public KakaoOAuth2UserInfo(Map<String, Object> attributes) {
        super(attributes);
    }

    @Override
    public String getId() {
        return String.valueOf(attributes.get("id"));
    }

    @Override
    public String getNickname() {
        Map<String, Object> profile = getProfile();
        if (profile == null) return null;

        return (String) profile.get("nickname");
    }

    @Override
    public String getImageUrl() {
        Map<String, Object> profile = getProfile();
        if (profile == null) return null;

        return (String) profile.get("thumbnail_image_url");
    }

    private Map<String, Object> getProfile() {
        Map<String, Object> account = (Map<String, Object>) attributes.get("kakao_account");
        return (Map<String, Object>) account.get("profile");
    }
}

