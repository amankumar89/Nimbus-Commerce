package com.aman.nimbus.user.event;

import com.aman.nimbus.user.entity.Role;
import com.aman.nimbus.user.entity.UserProfile;
import com.aman.nimbus.user.repository.UserProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
public class UserEventConsumer {

    private final UserProfileRepository userProfileRepository;

    @KafkaListener(topics = "${kafka.topics.user-events}", groupId = "user-service-group")
    @Transactional
    public void handleUserEvent(UserEvent event) {
        switch (event.getEventType()) {
            case "USER_REGISTERED" -> createProfile(event);
            case "USER_UPDATED", "USER_STATUS_CHANGED" -> updateProfile(event);
            default -> { /* ignore unknown event types */ }
        }
    }

    private void createProfile(UserEvent event) {
        // idempotency guard — avoid duplicate profile if event is redelivered (Kafka's at-least-once delivery)
        if (userProfileRepository.existsById(event.getUserId())) return;

        UserProfile profile = new UserProfile();
        profile.setId(event.getUserId());
        profile.setName(event.getName());
        profile.setEmail(event.getEmail());
        profile.setRole(Role.valueOf(event.getRole()));
        profile.setEnabled(event.isEnabled());
        profile.setCreatedAt(event.getCreatedAt());
        profile.setUpdatedAt(event.getUpdatedAt());

        userProfileRepository.save(profile);
    }

    private void updateProfile(UserEvent event) {
        userProfileRepository.findById(event.getUserId()).ifPresent(profile -> {
            profile.setName(event.getName());
            profile.setEmail(event.getEmail());
            profile.setEnabled(event.isEnabled());
            profile.setUpdatedAt(event.getUpdatedAt());
            userProfileRepository.save(profile);
        });
    }
}
