package com.aman.nimbus.user;

import com.aman.nimbus.user.event.UserEvent;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.junit.jupiter.api.Test;

import java.time.Instant;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;

class UserEventContractTests {

    @Test
    void deserializesTheAuthEventPayloadWithoutTimezoneConversion() throws Exception {
        UUID userId = UUID.randomUUID();
        String payload = """
                {"eventVersion":1,"eventType":"USER_REGISTERED","userId":"%s",
                "name":"Ada Lovelace","email":"ada@example.com","role":"CUSTOMER",
                "enabled":true,"createdAt":"2026-08-28T12:00:00Z","updatedAt":"2026-08-28T12:00:00Z"}
                """.formatted(userId);

        UserEvent event = new ObjectMapper().registerModule(new JavaTimeModule()).readValue(payload, UserEvent.class);

        assertThat(event.getEventVersion()).isEqualTo(1);
        assertThat(event.getUserId()).isEqualTo(userId);
        assertThat(event.getRole()).isEqualTo("CUSTOMER");
        assertThat(event.getCreatedAt()).isEqualTo(Instant.parse("2026-08-28T12:00:00Z"));
        assertThat(event.getUpdatedAt()).isEqualTo(event.getCreatedAt());
    }
}