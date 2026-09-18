package com.aman.nimbus.user.event;

import com.aman.nimbus.user.entity.Role;
import com.aman.nimbus.user.entity.UserProfile;
import com.aman.nimbus.user.repository.UserProfileRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
@Slf4j
public class UserEventConsumer {

    private final UserProfileRepository userProfileRepository;

    @KafkaListener(topics = "${kafka.topics.user-events}", groupId = "user-service-group")
    @Transactional
    public void handleUserEvent(UserEvent event) {
        validate(event);
        log.debug("Received user event type={} userId={}", event.getEventType(), event.getUserId());
        switch (event.getEventType()) {
            case "USER_REGISTERED" -> createProfile(event);
            case "USER_UPDATED", "USER_STATUS_CHANGED" -> upsertProfile(event);
            default -> throw new IllegalArgumentException("Unsupported user event type: " + event.getEventType());
        }
    }

    private void createProfile(UserEvent event) {
        // idempotency guard — avoid duplicate profile if event is redelivered (Kafka's at-least-once delivery)
        if (userProfileRepository.existsById(event.getUserId())) {
            log.debug("Skipping duplicate user registration userId={}", event.getUserId());
            return;
        }

        UserProfile profile = new UserProfile();
        applyEvent(profile, event);
        userProfileRepository.save(profile);
    }

    private void upsertProfile(UserEvent event) {
        UserProfile profile = userProfileRepository.findById(event.getUserId())
                .orElseGet(() -> {
                    UserProfile created = new UserProfile();
                    created.setId(event.getUserId());
                    created.setCreatedAt(event.getCreatedAt());
                    return created;
                });
        applyEvent(profile, event);
        userProfileRepository.save(profile);
    }

    private void applyEvent(UserProfile profile, UserEvent event) {
        if (profile.getCreatedAt() == null) {
            profile.setCreatedAt(event.getCreatedAt());
        }
        profile.setName(event.getName());
        profile.setEmail(event.getEmail());
        profile.setRole(Role.valueOf(event.getRole()));
        profile.setEnabled(event.isEnabled());
        profile.setUpdatedAt(event.getUpdatedAt());
    }

    private void validate(UserEvent event) {
        if (event == null || event.getEventVersion() != 1 || event.getUserId() == null
                || event.getEventType() == null || event.getName() == null || event.getName().isBlank()
                || event.getEmail() == null || event.getEmail().isBlank() || event.getRole() == null
                || event.getCreatedAt() == null || event.getUpdatedAt() == null) {
            throw new IllegalArgumentException("Invalid user event");
        }
        try {
            Role.valueOf(event.getRole());
        } catch (IllegalArgumentException exception) {
            throw new IllegalArgumentException("Invalid user role", exception);
        }
    }
}
