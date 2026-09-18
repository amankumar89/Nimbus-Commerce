package com.aman.nimbus.auth.event;

import com.aman.nimbus.auth.entity.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

import java.util.concurrent.TimeUnit;

@Component
@RequiredArgsConstructor
@Slf4j
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
            1,
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
        try {
            var result = kafkaTemplate.send(topic, user.getId().toString(), event)
                    .get(10, TimeUnit.SECONDS);
            log.debug("Published user event type={} userId={} partition={} offset={}",
                    eventType, user.getId(), result.getRecordMetadata().partition(),
                    result.getRecordMetadata().offset());
        } catch (InterruptedException exception) {
            Thread.currentThread().interrupt();
            throw new IllegalStateException("Interrupted while publishing user event", exception);
        } catch (Exception exception) {
            log.error("Failed to publish user event type={} userId={}", eventType, user.getId(), exception);
            throw new IllegalStateException("Unable to publish user event", exception);
        }
    }
}
