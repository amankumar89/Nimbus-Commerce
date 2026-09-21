package com.aman.nimbus.catalog.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.time.LocalDateTime;

@Getter
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class SuccessResponse<T> {
    private final boolean success;
    private final Integer status;
    private final String message;
    private final T data;
    private final LocalDateTime timestamp;

    public static <T> ResponseEntity<SuccessResponse<T>> ok(String message, T data) {
        return build(HttpStatus.OK, message, data);
    }

    public static <T> ResponseEntity<SuccessResponse<T>> created(String message, T data) {
        return build(HttpStatus.CREATED, message, data);
    }

    public static ResponseEntity<SuccessResponse<Void>> noContent(String message) {
        return build(HttpStatus.NO_CONTENT, message, null);
    }

    private static <T> ResponseEntity<SuccessResponse<T>> build(HttpStatus status, String message, T data) {
        return ResponseEntity.status(status).body(SuccessResponse.<T>builder()
                .success(true).status(status.value()).message(message).data(data)
                .timestamp(LocalDateTime.now()).build());
    }
}