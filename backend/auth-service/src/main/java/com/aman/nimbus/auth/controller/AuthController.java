package com.aman.nimbus.auth.controller;

import com.aman.nimbus.auth.dto.*;
import com.aman.nimbus.auth.service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @Value("${app.refresh-cookie-name}")
    private String refreshCookieName;

    @Value("${jwt.refresh-token-expiry-ms}")
    private long refreshTokenExpiryMs;

    @PostMapping("/register")
    public ResponseEntity<SuccessResponse<AuthResponse>> register(
            @Valid @RequestBody RegisterRequest request,
            HttpServletResponse response) {
        var result = authService.register(request);
        setRefreshCookie(response, result.rawRefreshToken());
        return SuccessResponse.created(
                "Registered successfully",
                new AuthResponse(result.accessToken(), result.userDto()));
    }

    @PostMapping("/login")
    public ResponseEntity<SuccessResponse<AuthResponse>> login(
            @Valid @RequestBody LoginRequest request,
            HttpServletResponse response) {
        var result = authService.login(request);
        setRefreshCookie(response, result.rawRefreshToken());
        return SuccessResponse.ok(
                "Logged in successfully",
                new AuthResponse(result.accessToken(), result.userDto()));
    }

    @PostMapping("/refresh")
    public ResponseEntity<SuccessResponse<AuthResponse>> refresh(
            HttpServletRequest request,
            HttpServletResponse response) {
        String rawRefreshToken = extractRefreshCookie(request);
        var result = authService.refresh(rawRefreshToken);
        setRefreshCookie(response, result.rawRefreshToken());
        return SuccessResponse.ok(
                "Token refreshed successfully",
                new AuthResponse(result.accessToken(), result.userDto()));
    }

    @PostMapping("/logout")
    public ResponseEntity<SuccessResponse<Void>> logout(
            HttpServletRequest request,
            HttpServletResponse response) {
        String rawRefreshToken = extractRefreshCookie(request);
        authService.logout(rawRefreshToken);
        clearRefreshCookie(response);
        return SuccessResponse.ok("Logged out successfully");
    }

    private void setRefreshCookie(
            HttpServletResponse response,
            String rawToken) {
        ResponseCookie cookie = ResponseCookie.from(refreshCookieName, rawToken)
                .httpOnly(true)
                .secure(false) // set true in production (HTTPS only)
                .path("/")
                .maxAge(refreshTokenExpiryMs / 1000)
                .sameSite("Lax") // use "None" + secure(true) if frontend/backend are on different domains
                .build();
        response.addHeader("Set-Cookie", cookie.toString());
    }

    private void clearRefreshCookie(HttpServletResponse response) {
        ResponseCookie cookie = ResponseCookie.from(refreshCookieName, "")
                .httpOnly(true)
                .secure(false)
                .path("/")
                .maxAge(0)
                .sameSite("Lax")
                .build();
        response.addHeader("Set-Cookie", cookie.toString());
    }

    private String extractRefreshCookie(HttpServletRequest request) {
        if (request.getCookies() == null) return null;
        for (var cookie : request.getCookies()) {
            if (cookie.getName().equals(refreshCookieName)) {
                return cookie.getValue();
            }
        }
        return null;
    }
}