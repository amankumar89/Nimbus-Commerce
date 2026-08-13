package com.aman.nimbus.auth.dto;

import com.aman.nimbus.auth.entity.Role;
import lombok.*;

import java.time.Instant;
import java.util.UUID;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    private UUID id;
    private String name;
    private String email;
    private Role role;
    private boolean enabled;
    private Instant createdAt;
    private Instant updatedAt;
}
