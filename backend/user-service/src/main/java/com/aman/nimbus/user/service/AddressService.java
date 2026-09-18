package com.aman.nimbus.user.service;

import com.aman.nimbus.user.dto.AddressDto;
import com.aman.nimbus.user.entity.Address;
import com.aman.nimbus.user.entity.UserProfile;
import com.aman.nimbus.user.exception.ResourceNotFoundException;
import com.aman.nimbus.user.repository.AddressRepository;
import com.aman.nimbus.user.repository.UserProfileRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AddressService {

    private final AddressRepository addressRepository;
    private final UserProfileRepository userProfileRepository;
    private final ModelMapper modelMapper = new ModelMapper();

    public List<AddressDto> getAddresses(UUID userId) {
        return addressRepository.findByUserProfileId(userId).stream()
                .map(address -> modelMapper.map(address, AddressDto.class))
                .toList();
    }

    @Transactional
    public AddressDto createAddress(UUID userId, AddressDto request) {
        UserProfile profile = userProfileRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Profile not found"));

        boolean isFirstAddress = addressRepository.findByUserProfileId(userId).isEmpty();

        Address address = modelMapper.map(request, Address.class);
        address.setUserProfile(profile);
        address.setDefault(isFirstAddress); // first address auto-becomes default

        Address saved = addressRepository.saveAndFlush(address);
        return modelMapper.map(saved, AddressDto.class);
    }

    @Transactional
    public List<AddressDto> setDefault(UUID userId, UUID addressId) {
        List<Address> addresses = addressRepository.findByUserProfileId(userId);

        boolean found = false;
        for (Address addr : addresses) {
            boolean isTarget = addr.getId().equals(addressId);
            addr.setDefault(isTarget);
            if (isTarget) found = true;
        }

        if (!found) throw new ResourceNotFoundException("Address not found");

        addressRepository.saveAllAndFlush(addresses);
        return addresses.stream().map((address -> modelMapper.map(address, AddressDto.class))).toList();
    }

    @Transactional
    public List<AddressDto> deleteAddress(UUID userId, UUID addressId) {
        Address address = addressRepository.findById(addressId)
                .orElseThrow(() -> new ResourceNotFoundException("Address not found"));

        if (!address.getUserProfile().getId().equals(userId)) {
            throw new ResourceNotFoundException("Address not found");
        }

        boolean wasDefault = address.isDefault();
        addressRepository.delete(address);

        List<Address> remaining = addressRepository.findByUserProfileId(userId);

        // if we deleted the default address, promote another one automatically
        if (wasDefault && !remaining.isEmpty()) {
            remaining.get(0).setDefault(true);
            addressRepository.save(remaining.get(0));
        }

        return addressRepository
                .findByUserProfileId(userId)
                .stream()
                .map(address1 -> modelMapper.map(address, AddressDto.class))
                .toList();
    }
}
