package com.healthymart.network.dto;

public class AuthResponse {
    public String token;
    public User user;

    public static class User {
        public String id;
        public String email;
    }
}


