package com.aman.nimbus.auth.event;

import com.aman.nimbus.auth.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UserEvent {

    private String eventType; // USER_REGISTERED, USER_UPDATED, USER_STATUS_CHANGED
    private UUID userId;
    private String name;
    private String email;
    private Role role;
    private boolean enabled;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}