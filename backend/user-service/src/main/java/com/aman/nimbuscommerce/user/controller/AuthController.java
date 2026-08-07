package com.aman.nimbuscommerce.user.controller;

import com.aman.nimbuscommerce.user.dto.request.ForgotPasswordRequest;
import com.aman.nimbuscommerce.user.dto.request.LoginRequest;
import com.aman.nimbuscommerce.user.dto.request.RegisterUserRequest;
import com.aman.nimbuscommerce.user.dto.request.ResetPasswordRequest;
import com.aman.nimbuscommerce.user.dto.response.LoginResponse;
import com.aman.nimbuscommerce.user.dto.response.SuccessResponse;
import com.aman.nimbuscommerce.user.dto.response.UserResponse;
import com.aman.nimbuscommerce.user.service.AuthService;
import com.aman.nimbuscommerce.user.utils.CookieUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final CookieUtil cookieUtil;

    @PostMapping("/register")
    public ResponseEntity<SuccessResponse<UserResponse>> register(
            @Valid @RequestBody RegisterUserRequest request) {
        log.info("GET /auth/register AuthController"); // Per your naming convention
        return SuccessResponse.ok("Registration successful", authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<SuccessResponse<LoginResponse>> login(
            @Valid @RequestBody LoginRequest request,
            HttpServletResponse response
    ) {
        log.info("POST /auth/login AuthController");
        return SuccessResponse.ok("Login successful", authService.login(request, response));
    }

    @PostMapping("/logout")
    public ResponseEntity<SuccessResponse<Void>> logout(
            HttpServletRequest request,
            HttpServletResponse response
            ) {
        log.info("POST /auth/logout AuthController");
        String refreshToken = cookieUtil.getRefreshToken(request);
        authService.logout(refreshToken, response);
        return SuccessResponse.ok("Logged out successfully");
    }

    @PostMapping("/refresh")
    public ResponseEntity<SuccessResponse<LoginResponse>> refreshToken(
            HttpServletRequest request,
            HttpServletResponse response) {
        log.info("POST /auth/refresh AuthController");
        String refreshToken = cookieUtil.getRefreshToken(request);
        return SuccessResponse.ok(
                "Token refreshed successfully",
                authService.generateRefreshToken(refreshToken, response)
        );
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<SuccessResponse<Void>> forgotPassword(
            @Valid @RequestBody ForgotPasswordRequest request) {
        log.info("POST /auth/forgot-password AuthController");
        authService.forgotPassword(request);
        return SuccessResponse.ok(
                "If an account with that email exists, a reset link has been sent");
    }

    @PostMapping("/reset-password")
    public ResponseEntity<SuccessResponse<Void>> resetPassword(
            @Valid @RequestBody ResetPasswordRequest request) {
        log.info("POST /auth/reset-password AuthController");
        authService.resetPassword(request);
        return SuccessResponse.ok("Password reset successfully");
    }
}