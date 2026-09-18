package com.aman.nimbus.user.dto;

import com.aman.nimbus.user.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;
import java.util.UUID;

@Setter
@Getter
@Builder
@AllArgsConstructor
public class AdminCustomerDto {
    private UUID id;
    private String name;
    private String email;
    private Role role;
    private boolean enabled;
    private Instant createdAt;
    // totalOrders and totalSpent will come from Order Service later —
    // stubbing as 0 here since User Service has no visibility into orders.
    // A real implementation would call Order Service or use a read-model/CQRS pattern.
    private int totalOrders;
    private double totalSpent;
}
