package com.aman.nimbus.user.dto;

import com.aman.nimbus.user.entity.Role;
import lombok.*;

import java.time.Instant;
import java.util.UUID;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserProfileDto {
    private UUID id;
    private String name;
    private String email;
    private Role role;
    private boolean enabled;
    private Instant createdAt;
    private Instant updatedAt;
}