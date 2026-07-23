package com.aman.nimbuscommerce.user.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.Map;

@Getter
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({
        "success",
        "status",
        "message",
        "errors",
        "path",
        "timestamp",
})
public class ErrorResponse {

    private final boolean success;
    private final String message;
    private final Integer status;
    private final Map<String, String> errors;
    private String path;
    private final LocalDateTime timestamp;

    private static ResponseEntity<ErrorResponse> build(
            HttpStatus status,
            String message,
            Map<String, String> errors,
            String path,
            String defaultMessage
    ) {
        return ResponseEntity.status(status).body(
                ErrorResponse.builder()
                        .success(false)
                        .message(message != null ? message : defaultMessage)
                        .status(status.value())
                        .errors(errors)
                        .path(path)
                        .timestamp(LocalDateTime.now())
                        .build()
        );
    }

    public static ResponseEntity<ErrorResponse> badRequest(String message) {
        return build(HttpStatus.BAD_REQUEST, message, null, null, "Invalid request");
    }

    public static ResponseEntity<ErrorResponse> validation(
            Map<String, String> errors,
            String message
    ) {
        return build(HttpStatus.BAD_REQUEST, message, errors,null, "Validation failed");
    }

    public static ResponseEntity<ErrorResponse> unauthorized(String message) {
        return build(HttpStatus.UNAUTHORIZED, message, null, null, "Unauthorized");
    }

    public static ResponseEntity<ErrorResponse> forbidden(String message) {
        return build(HttpStatus.FORBIDDEN, message, null, null, "Forbidden: Access denied");
    }

    public static ResponseEntity<ErrorResponse> notFound(String message) {
        return build(HttpStatus.NOT_FOUND, message, null, null,"Resource not found");
    }

    public static ResponseEntity<ErrorResponse> conflict(String message) {
        return build(HttpStatus.CONFLICT, message, null, null, "Resource already exists");
    }

    public static ResponseEntity<ErrorResponse> internalServerError(String message) {
        return build(
                HttpStatus.INTERNAL_SERVER_ERROR,
                message,
                null,
                null,
                "Something went wrong. Please try again later"
        );
    }
}