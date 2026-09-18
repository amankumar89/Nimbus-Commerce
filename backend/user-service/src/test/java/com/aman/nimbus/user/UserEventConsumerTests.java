package com.aman.nimbus.user;

import com.aman.nimbus.user.entity.Role;
import com.aman.nimbus.user.entity.UserProfile;
import com.aman.nimbus.user.event.UserEvent;
import com.aman.nimbus.user.event.UserEventConsumer;
import com.aman.nimbus.user.repository.UserProfileRepository;
import org.junit.jupiter.api.Test;

import java.time.Instant;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

class UserEventConsumerTests {

    @Test
    void createsProfileWithAuthUserIdWhenUserIsRegistered() {
        UserProfileRepository repository = mock(UserProfileRepository.class);
        UserEventConsumer consumer = new UserEventConsumer(repository);
        UUID userId = UUID.randomUUID();
        Instant timestamp = Instant.parse("2026-08-28T12:00:00Z");
        UserEvent event = event(userId, timestamp);

        when(repository.existsById(userId)).thenReturn(false);

        consumer.handleUserEvent(event);

        verify(repository).save(any(UserProfile.class));
        org.mockito.ArgumentCaptor<UserProfile> captor =
                org.mockito.ArgumentCaptor.forClass(UserProfile.class);
        verify(repository).save(captor.capture());
        UserProfile profile = captor.getValue();
        assertThat(profile.getId()).isEqualTo(userId);
        assertThat(profile.getEmail()).isEqualTo("ada@example.com");
        assertThat(profile.getRole()).isEqualTo(Role.CUSTOMER);
    }

    private UserEvent event(UUID userId, Instant timestamp) {
        UserEvent event = new UserEvent();
        event.setEventVersion(1);
        event.setEventType("USER_REGISTERED");
        event.setUserId(userId);
        event.setName("Ada Lovelace");
        event.setEmail("ada@example.com");
        event.setRole("CUSTOMER");
        event.setEnabled(true);
        event.setCreatedAt(timestamp);
        event.setUpdatedAt(timestamp);
        return event;
    }
}