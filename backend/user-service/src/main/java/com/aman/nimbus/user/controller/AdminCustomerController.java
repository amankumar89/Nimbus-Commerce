package com.aman.nimbus.user.controller;

import com.aman.nimbus.user.dto.AdminCustomerDto;
import com.aman.nimbus.user.dto.PageResponse;
import com.aman.nimbus.user.dto.SuccessResponse;
import com.aman.nimbus.user.service.AdminCustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/admin/customers")
@RequiredArgsConstructor
public class AdminCustomerController {

    private final AdminCustomerService adminCustomerService;

    @GetMapping
    public ResponseEntity<SuccessResponse<PageResponse<AdminCustomerDto>>> getCustomers(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String search) {
        return SuccessResponse.ok(
                "All customers fetched",
                adminCustomerService.getCustomers(page, size, search));
    }

    @PatchMapping("/{id}/toggle-status")
    public ResponseEntity<SuccessResponse<AdminCustomerDto>> toggleStatus(@PathVariable UUID id) {
        return SuccessResponse.ok(
                "Customer toggle updated",
                adminCustomerService.toggleStatus(id));
    }
}