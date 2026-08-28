package com.aman.nimbus.auth;

import com.aman.nimbus.auth.entity.Role;
import com.aman.nimbus.auth.event.UserEvent;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.junit.jupiter.api.Test;

import java.time.Instant;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;

class UserEventContractTests {

    @Test
    void serializesVersionedEventTimestampsAsUtcInstants() throws Exception {
        Instant createdAt = Instant.parse("2026-08-28T12:00:00Z");
        UserEvent event = new UserEvent(1, "USER_REGISTERED", UUID.randomUUID(),
                "Ada Lovelace", "ada@example.com", Role.CUSTOMER, true, createdAt, createdAt);

        String payload = new ObjectMapper().registerModule(new JavaTimeModule()).writeValueAsString(event);

        assertThat(payload).contains("\"eventVersion\":1");
        assertThat(payload).contains("\"createdAt\":\"2026-08-28T12:00:00Z\"");
        assertThat(payload).contains("\"updatedAt\":\"2026-08-28T12:00:00Z\"");
    }
}