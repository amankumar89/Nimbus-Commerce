package com.aman.nimbuscommerce.user.service;

import com.aman.nimbuscommerce.user.dto.request.LoginRequest;
import com.aman.nimbuscommerce.user.dto.response.LoginResponse;
import com.aman.nimbuscommerce.user.dto.request.RegisterRequest;
import com.aman.nimbuscommerce.user.dto.response.UserResponse;
import com.aman.nimbuscommerce.user.entity.User;
import com.aman.nimbuscommerce.user.exception.DuplicateException;
import com.aman.nimbuscommerce.user.repository.UserRepository;
import com.aman.nimbuscommerce.user.security.JwtTokenProvider;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    public UserResponse register(RegisterRequest registerRequest) {
        if(userRepository.existsByEmail(registerRequest.getEmail())){
            throw new DuplicateException("Email already registered");
        }
        registerRequest.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        User user = modelMapper.map(registerRequest, User.class);
        return modelMapper.map(userRepository.save(user), UserResponse.class);
    }
    public LoginResponse login(@Valid LoginRequest loginRequest) {
        User user = userRepository
                .findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new BadCredentialsException("Invalid email or password"));
        System.out.println(user.toString());
        if(!user.isEnabled()){
            throw new BadCredentialsException(
                    "Your account has been disabled. Please contact support."
            );
        }
        if(!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())){
            throw new BadCredentialsException("Invalid email or password");
        }

        // generate token
        String token = jwtTokenProvider.generateToken(user);
        UserResponse userResponse = modelMapper.map(user, UserResponse.class);
        return LoginResponse.builder()
                .token(token)
//                .expiry(jwtTokenProvider.())
                .user(userResponse)
                .build();
    }
}
