package com.aman.nimbus.user.service;

import com.aman.nimbus.user.dto.UpdateProfileRequest;
import com.aman.nimbus.user.dto.UserProfileDto;
import com.aman.nimbus.user.entity.UserProfile;
import com.aman.nimbus.user.exception.ResourceNotFoundException;
import com.aman.nimbus.user.repository.UserProfileRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProfileService {

    private final UserProfileRepository userProfileRepository;
    private final ModelMapper modelMapper = new ModelMapper();

    public UserProfileDto getProfile(UUID userId) {
        UserProfile profile = userProfileRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Profile not found"));
        return modelMapper.map(profile, UserProfileDto.class);
    }

    @Transactional
    public UserProfileDto updateProfile(UUID userId, UpdateProfileRequest request) {
        UserProfile profile = userProfileRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Profile not found"));

        profile.setName(request.getName());
        profile.setEmail(request.getEmail());
        profile.setUpdatedAt(Instant.now());

        UserProfile saved = userProfileRepository.saveAndFlush(profile);
        return modelMapper.map(saved, UserProfileDto.class);
    }
}