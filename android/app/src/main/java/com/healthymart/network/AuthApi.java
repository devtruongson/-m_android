package com.healthymart.network;

import com.healthymart.network.dto.AuthResponse;
import com.healthymart.network.dto.LoginRequest;
import com.healthymart.network.dto.RegisterRequest;
import com.healthymart.network.dto.RegisterResponse;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.POST;

public interface AuthApi {
    @POST("api/auth/login")
    Call<AuthResponse> login(@Body LoginRequest request);

    @POST("api/auth/register")
    Call<RegisterResponse> register(@Body RegisterRequest request);
}


