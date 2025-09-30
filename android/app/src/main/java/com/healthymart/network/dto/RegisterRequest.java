package com.healthymart.network.dto;

public class RegisterRequest {
    public String email;
    public String password;
    public RegisterRequest(String email, String password) {
        this.email = email;
        this.password = password;
    }
}


