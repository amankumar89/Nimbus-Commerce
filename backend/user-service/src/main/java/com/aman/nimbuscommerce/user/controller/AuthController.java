package com.aman.nimbuscommerce.user.controller;

import com.aman.nimbuscommerce.user.dto.request.LoginRequest;
import com.aman.nimbuscommerce.user.dto.request.RegisterRequest;
import com.aman.nimbuscommerce.user.dto.response.LoginResponse;
import com.aman.nimbuscommerce.user.dto.response.SuccessResponse;
import com.aman.nimbuscommerce.user.dto.response.UserResponse;
import com.aman.nimbuscommerce.user.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<SuccessResponse<UserResponse>> registerUser(
            @Valid @RequestBody RegisterRequest registerRequest
            )
    {
        return SuccessResponse.created(
                authService.register(registerRequest),
                "User registered");
    }

    @PostMapping("/login")
    public ResponseEntity<SuccessResponse<LoginResponse>> loginUser(
            @Valid @RequestBody LoginRequest loginRequest
    ){
        return SuccessResponse.ok(authService.login(loginRequest), "Login successfully");
    }
}
