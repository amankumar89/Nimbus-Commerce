package com.aman.nimbus.user.service;


import com.aman.nimbus.user.dto.AdminCustomerDto;
import com.aman.nimbus.user.dto.PageResponse;
import com.aman.nimbus.user.entity.UserProfile;
import com.aman.nimbus.user.exception.ResourceNotFoundException;
import com.aman.nimbus.user.repository.UserProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AdminCustomerService {

    private final UserProfileRepository userProfileRepository;

    public PageResponse<AdminCustomerDto> getCustomers(int page, int size, String search) {
        var pageable = PageRequest.of(page - 1, size, Sort.by(Sort.Direction.DESC, "createdAt"));
        var result = userProfileRepository.search(search, pageable);

        var items = result
                .getContent()
                .stream()
                .map(this::toDto).toList();

        return new PageResponse<>(
                items, page, size, result.getTotalElements(), result.getTotalPages()
        );
    }

    @Transactional
    public AdminCustomerDto toggleStatus(java.util.UUID id) {
        UserProfile profile = userProfileRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found"));

        profile.setEnabled(!profile.isEnabled());
        UserProfile saved = userProfileRepository.saveAndFlush(profile);

        // NOTE: same cross-service consistency concern as profile updates —
        // Auth Service's User.enabled should also flip so login is actually blocked.
        // Needs an event published back, or better: route this action through Auth Service.

        return toDto(saved);
    }

    private AdminCustomerDto toDto(UserProfile profile) {
        return new AdminCustomerDto(
                profile.getId(), profile.getName(), profile.getEmail(),
                profile.getRole(), profile.isEnabled(), profile.getCreatedAt(),
                0, 0.0 // placeholders until Order Service integration
        );
    }
}
