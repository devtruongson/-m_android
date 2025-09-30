package com.healthymart.network.dto;

public class RegisterResponse {
    public User user;

    public static class User {
        public String id;
        public String email;
    }
}


