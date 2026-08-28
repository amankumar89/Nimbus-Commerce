package com.aman.nimbus.user.controller;

import com.aman.nimbus.user.dto.SuccessResponse;
import com.aman.nimbus.user.dto.UpdateProfileRequest;
import com.aman.nimbus.user.dto.UserProfileDto;
import com.aman.nimbus.user.service.ProfileService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class ProfileController {

    private final ProfileService profileService;

    @GetMapping("/me")
    public ResponseEntity<SuccessResponse<UserProfileDto>> getMe(@RequestHeader("X-User-Id") UUID userId) {
        return SuccessResponse.ok(
                "User profile fetched",
                profileService.getProfile(userId));
    }

    @PatchMapping("/me")
    public ResponseEntity<SuccessResponse<UserProfileDto>> updateMe(
            @RequestHeader("X-User-Id") UUID userId,
            @Valid @RequestBody UpdateProfileRequest request) {
        return SuccessResponse.ok(
                "User profile updated",
                profileService.updateProfile(userId, request));
    }
}