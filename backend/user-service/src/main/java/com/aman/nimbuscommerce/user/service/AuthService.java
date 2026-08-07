package com.aman.nimbuscommerce.user.service;

import com.aman.nimbuscommerce.user.dto.request.ForgotPasswordRequest;
import com.aman.nimbuscommerce.user.dto.request.LoginRequest;
import com.aman.nimbuscommerce.user.dto.request.ResetPasswordRequest;
import com.aman.nimbuscommerce.user.dto.response.LoginResponse;
import com.aman.nimbuscommerce.user.dto.request.RegisterUserRequest;
import com.aman.nimbuscommerce.user.dto.response.UserResponse;
import com.aman.nimbuscommerce.user.entity.RefreshToken;
import com.aman.nimbuscommerce.user.entity.User;
import com.aman.nimbuscommerce.user.exception.DuplicateException;
import com.aman.nimbuscommerce.user.exception.ForbiddenException;
import com.aman.nimbuscommerce.user.repository.RefreshTokenRepository;
import com.aman.nimbuscommerce.user.repository.UserRepository;
import com.aman.nimbuscommerce.user.security.JwtTokenProvider;
import com.aman.nimbuscommerce.user.utils.CookieUtil;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.Base64;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final AuthenticationManager authenticationManager;
    private final RefreshTokenRepository refreshTokenRepository;
    private final CookieUtil cookieUtil;

    @Value("${jwt.refresh-token-expiration}")
    private long refreshTokenExpiration;

    @Transactional
    public UserResponse register(RegisterUserRequest registerUserRequest) {
        log.info("AuthService | POST /auth/register | email={}", registerUserRequest.getEmail());
        if(userRepository.existsByEmail(registerUserRequest.getEmail())){
            throw new DuplicateException("Email already registered");
        }
        User user = modelMapper.map(registerUserRequest, User.class);
        user.setPassword(passwordEncoder.encode(registerUserRequest.getPassword()));
        return modelMapper.map(userRepository.save(user), UserResponse.class);
    }

    @Transactional
    public LoginResponse login(
            LoginRequest loginRequest,
            HttpServletResponse response
    ) {
        log.info("AuthService | POST /auth/login | email={}", loginRequest.getEmail());
        User user = userRepository
                .findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new ForbiddenException("Invalid email or password"));

        // check for user is enabled or not
        if(!user.isEnabled()){
            throw new ForbiddenException(
                    "Your account has been disabled. Please contact support."
            );
        }

        if(!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())){
            throw new ForbiddenException("Invalid email or password");
        }

        // generate token
        String accessToken = jwtTokenProvider.generateToken(user);
        RefreshToken refreshToken = createRefreshToken(user);
        refreshTokenRepository.save(refreshToken);
        cookieUtil.addRefreshCookie(
                response,
                refreshToken.getToken(),
                (int)(refreshTokenExpiration) / 1000
        );
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                loginRequest.getEmail(), loginRequest.getPassword()
        ));
        return LoginResponse.builder()
                .accessToken(accessToken)
                .user(modelMapper.map(user, UserResponse.class))
                .build();
    }

    @Transactional
    public void logout(String token, HttpServletResponse response) {
        log.info("AuthService | POST /auth/logout | hasRefreshToken={}", token != null);
        RefreshToken refreshToken = refreshTokenRepository
                .findByToken(token)
                .orElseThrow(() -> new ForbiddenException("Missing refresh token"));
        refreshTokenRepository.delete(refreshToken);
        cookieUtil.clearRefreshCookie(response);
    }

    @Transactional
    public LoginResponse generateRefreshToken(String refreshToken, HttpServletResponse response) {
        if (refreshToken == null || refreshToken.isBlank()) {
            throw new ForbiddenException("Refresh token is missing.");
        }
        RefreshToken storedToken = refreshTokenRepository
                .findByToken(refreshToken)
                .orElseThrow(() -> new ForbiddenException("Invalid refresh token"));

        if (storedToken.isRevoked()) {
            throw new ForbiddenException("Refresh token has been revoked.");
        }

        if (storedToken.getExpiryDate().isBefore(LocalDateTime.now())) {
            refreshTokenRepository.delete(storedToken);
            throw new ForbiddenException("Refresh token has expired.");
        }
        User user = storedToken.getUser();
        refreshTokenRepository.delete(storedToken);
        RefreshToken newRefreshToken = createRefreshToken(user);
        refreshTokenRepository.save(newRefreshToken);

        cookieUtil.addRefreshCookie(
                response,
                newRefreshToken.getToken(),
                (int) (refreshTokenExpiration / 1000)
        );

        String accessToken = jwtTokenProvider.generateToken(user);
        return LoginResponse
                .builder()
                .accessToken(accessToken)
                .user(modelMapper.map(user, UserResponse.class))
                .build();
    }

    public void forgotPassword(ForgotPasswordRequest request) {
        log.info("AuthService | POST /auth/forgot-password | email={}", request.getEmail());
        // TODO: Generate reset token, persist with expiry, send email
        // ⚠️ Always return success even if email not found (prevent user enumeration)
    }

    public void resetPassword(ResetPasswordRequest request) {
        log.info("AuthService | POST /auth/reset-password | hasToken={}", request.getToken() != null);
        // TODO: Validate token + expiry, encode new password, update user, invalidate token
    }

    private RefreshToken createRefreshToken(User user) {
        String token = generateRandomToken();
        return RefreshToken
                .builder()
                .token(token)
                .user(user)
                .revoked(false)
                .expiryDate(
                        LocalDateTime.now()
                                .plusSeconds(refreshTokenExpiration / 1000)
                )
                .build();
    }

    private String generateRandomToken() {
        byte[] bytes = new byte[64];
        new SecureRandom().nextBytes(bytes);
        return Base64.getUrlEncoder()
                .withoutPadding()
                .encodeToString(bytes);
    }
}
