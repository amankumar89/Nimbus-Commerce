package com.aman.nimbus.auth.service;

import com.aman.nimbus.auth.dto.*;
import com.aman.nimbus.auth.entity.RefreshToken;
import com.aman.nimbus.auth.entity.Role;
import com.aman.nimbus.auth.entity.User;
import com.aman.nimbus.auth.event.UserEventProducer;
import com.aman.nimbus.auth.exception.BadRequestException;
import com.aman.nimbus.auth.exception.DuplicateException;
import com.aman.nimbus.auth.exception.UnauthorizedException;
import com.aman.nimbus.auth.repository.RefreshTokenRepository;
import com.aman.nimbus.auth.repository.UserRepository;
import com.aman.nimbus.auth.security.RefreshTokenUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final RefreshTokenUtil refreshTokenUtil;
    private final ModelMapper modelMapper;
    private final UserEventProducer userEventProducer;

    @Value("${jwt.refresh-token-expiry-ms}")
    private long refreshTokenExpiryMs;

    public record AuthResult(String accessToken, String rawRefreshToken, UserDto userDto) {}

    @Transactional
    public AuthResult register(RegisterRequest request) {
        log.info("Register Service with user {}", request.getEmail());
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new DuplicateException("An account with this email already exists");
        }

        User user = modelMapper.map(request, User.class);
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        if(user.getRole() == null) {
            user.setRole(Role.CUSTOMER);
        }

        User saved = userRepository.saveAndFlush(user);
        userEventProducer.publishUserRegistered(saved);
        return issueTokens(saved);
    }

    @Transactional
    public AuthResult login(LoginRequest request) {
        log.info("Login Service with user {}", request.getEmail());
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new UnauthorizedException("Invalid email or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new UnauthorizedException("Invalid email or password");
        }

        if (!user.isEnabled()) {
            throw new UnauthorizedException("This account has been disabled");
        }

        return issueTokens(user);
    }

    @Transactional
    public AuthResult refresh(String rawRefreshToken) {
        log.info("Refresh Token Service with user {}", rawRefreshToken);
        if (rawRefreshToken == null || rawRefreshToken.isBlank()) {
            throw new UnauthorizedException("Missing refresh token");
        }

        String hash = refreshTokenUtil.hash(rawRefreshToken);

        RefreshToken storedToken = refreshTokenRepository.findByTokenHash(hash)
                .orElseThrow(() -> new UnauthorizedException("Invalid refresh token"));

        if (storedToken.isRevoked() || storedToken.getExpiresAt().isBefore(LocalDateTime.now())) {
            throw new UnauthorizedException("Refresh token expired or revoked");
        }

        // Rotate: revoke old, issue new — prevents replay of a stolen refresh token
        storedToken.setRevoked(true);
        refreshTokenRepository.save(storedToken);

        return issueTokens(storedToken.getUser());
    }

    @Transactional
    public void logout(String rawRefreshToken) {
        log.info("Logout Service with user");
        if (rawRefreshToken == null || rawRefreshToken.isBlank()) return;

        String hash = refreshTokenUtil.hash(rawRefreshToken);
        refreshTokenRepository.findByTokenHash(hash).ifPresent(token -> {
            token.setRevoked(true);
            refreshTokenRepository.save(token);
        });
    }

    private AuthResult issueTokens(User user) {
        String accessToken = jwtService.generateAccessToken(user);
        String rawRefreshToken = refreshTokenUtil.generateRawToken();

        RefreshToken refreshTokenEntity = new RefreshToken();
        refreshTokenEntity.setUser(user);
        refreshTokenEntity.setTokenHash(refreshTokenUtil.hash(rawRefreshToken));
        refreshTokenEntity.setExpiresAt(
                LocalDateTime
                        .ofInstant(Instant.now().plusMillis(refreshTokenExpiryMs), ZoneId.systemDefault())
        );
        refreshTokenRepository.save(refreshTokenEntity);
        UserDto userDto = modelMapper.map(user, UserDto.class);
        return new AuthResult(accessToken, rawRefreshToken, userDto);
    }
}
