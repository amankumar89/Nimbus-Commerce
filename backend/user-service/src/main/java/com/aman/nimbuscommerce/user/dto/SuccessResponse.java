package com.aman.nimbuscommerce.user.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.Builder;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.time.Instant;
import java.time.LocalDateTime;

@Getter
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({
        "success",
        "status",
        "message",
        "data",
        "timestamp",
})
public class SuccessResponse<T> {

    private final boolean success;
    private final Integer status;
    private final String message;
    private final T data;
    private final LocalDateTime timestamp;

    private static <T> ResponseEntity<SuccessResponse<T>> build(
            HttpStatus status,
            String message,
            T data,
            String defaultMessage
    ) {
        return ResponseEntity.status(status).body(
                SuccessResponse.<T>builder()
                        .success(true)
                        .message(message != null ? message : defaultMessage)
                        .data(data)
                        .status(status.value())
                        .timestamp(LocalDateTime.now())
                        .build()
        );
    }

    public static <T> ResponseEntity<SuccessResponse<T>> ok(T data, String message) {
        return build(HttpStatus.OK, message, data, "Request completed successfully");
    }

    public static <T> ResponseEntity<SuccessResponse<T>> created(T data, String message) {
        return build(HttpStatus.CREATED, message, data, "Resource created successfully");
    }

    public static ResponseEntity<SuccessResponse<Void>> noContent(String message) {
        return build(HttpStatus.NO_CONTENT, message, null, "No content available");
    }
}