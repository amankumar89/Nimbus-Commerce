package com.aman.nimbus.user.controller;

import com.aman.nimbus.user.dto.AddressDto;
import com.aman.nimbus.user.dto.SuccessResponse;
import com.aman.nimbus.user.service.AddressService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/addresses")
@RequiredArgsConstructor
public class AddressController {

    private final AddressService addressService;

    @GetMapping
    public ResponseEntity<SuccessResponse<List<AddressDto>>> getAddresses(
            @RequestHeader("X-User-Id") UUID userId) {
        return SuccessResponse.ok("Address fetched",
                addressService.getAddresses(userId));
    }

    @PostMapping
    public ResponseEntity<SuccessResponse<AddressDto>> createAddress(
            @RequestHeader("X-User-Id") UUID userId,
            @Valid @RequestBody AddressDto request) {
        return SuccessResponse.ok("Address added",
                addressService.createAddress(userId, request));
    }

    @PatchMapping("/{id}/default")
    public ResponseEntity<SuccessResponse<List<AddressDto>>> setDefault(
            @RequestHeader("X-User-Id") UUID userId,
            @PathVariable UUID id) {
        return SuccessResponse.ok("Default address set",
                addressService.setDefault(userId, id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<SuccessResponse<List<AddressDto>>> deleteAddress(
            @RequestHeader("X-User-Id") UUID userId,
            @PathVariable UUID id) {
        return SuccessResponse.ok("Address deleted",
                addressService.deleteAddress(userId, id));
    }
}
