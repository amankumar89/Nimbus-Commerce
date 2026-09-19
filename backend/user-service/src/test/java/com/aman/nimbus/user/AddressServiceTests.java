package com.aman.nimbus.user;

import com.aman.nimbus.user.dto.AddressDto;
import com.aman.nimbus.user.entity.Address;
import com.aman.nimbus.user.entity.UserProfile;
import com.aman.nimbus.user.repository.AddressRepository;
import com.aman.nimbus.user.repository.UserProfileRepository;
import com.aman.nimbus.user.service.AddressService;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class AddressServiceTests {

    @Test
    void deleteAddressReturnsTheRemainingAddresses() {
        AddressRepository addressRepository = mock(AddressRepository.class);
        UserProfileRepository userProfileRepository = mock(UserProfileRepository.class);
        AddressService service = new AddressService(addressRepository, userProfileRepository);
        UUID userId = UUID.randomUUID();
        UserProfile profile = new UserProfile();
        profile.setId(userId);

        Address deleted = address("Deleted", false, profile);
        Address remaining = address("Remaining", true, profile);

        when(addressRepository.findById(deleted.getId())).thenReturn(java.util.Optional.of(deleted));
        when(addressRepository.findByUserProfileId(userId))
                .thenReturn(List.of(remaining))
                .thenReturn(List.of(remaining));

        List<AddressDto> result = service.deleteAddress(userId, deleted.getId());

        assertThat(result).singleElement().extracting(AddressDto::getFullName).isEqualTo("Remaining");
    }

    private Address address(String fullName, boolean isDefault, UserProfile profile) {
        Address address = Address.builder()
                .fullName(fullName)
                .phone("1234567890")
                .line1("Line 1")
                .city("City")
                .state("State")
                .postalCode("1234")
                .country("India")
                .isDefault(isDefault)
                .userProfile(profile)
                .build();
        address.setId(UUID.randomUUID());
        return address;
    }
}