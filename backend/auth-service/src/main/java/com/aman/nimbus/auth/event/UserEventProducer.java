package com.aman.nimbus.auth.event;

import com.aman.nimbus.auth.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserEventProducer {

    private final KafkaTemplate<String, UserEvent> kafkaTemplate;

    @Value("${kafka.topics.user-events}")
    private String topic;

    public void publishUserRegistered(User user) {
        publish("USER_REGISTERED", user);
    }

    public void publishUserUpdated(User user) {
        publish("USER_UPDATED", user);
    }

    public void publishUserStatusChanged(User user) {
        publish("USER_STATUS_CHANGED", user);
    }

    private void publish(String eventType, User user) {
        UserEvent event = new UserEvent(
                eventType,
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole(),
                user.isEnabled(),
                user.getCreatedAt(),
                user.getUpdatedAt()
        );
        // key = userId string, ensures all events for the same user go to the same partition (ordering guarantee)
        kafkaTemplate.send(topic, user.getId().toString(), event);
    }
}
