package com.aman.nimbus.user.event;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
public class UserEvent {
    private String eventType;
    private UUID userId;
    private String name;
    private String email;
    private String role;
    private boolean enabled;
    private Instant createdAt;
    private Instant updatedAt;
}