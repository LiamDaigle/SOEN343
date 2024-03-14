package com.smarthome.smarthomesystem;

import com.smarthome.smarthomesystem.domain.User;

public final class TestDataUtil {

    private TestDataUtil(){}

    public static User createTestUser1() {
        return User.builder()
                .id(1L)
                .username("john_smith")
                .password("development_password")
                .build();
    }
    public static User createTestUser2() {
        return User.builder()
                .id(2L)
                .username("john_smith")
                .password("development_password")
                .build();
    }
    public static User createTestUser3() {
        return User.builder()
                .id(3L)
                .username("john_smith")
                .password("development_password")
                .build();
    }
}
