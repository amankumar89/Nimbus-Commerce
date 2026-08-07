package com.aman.nimbuscommerce.user.service;

import com.aman.nimbuscommerce.user.config.CurrentUser;
import com.aman.nimbuscommerce.user.dto.request.AddressRequest;
import com.aman.nimbuscommerce.user.dto.response.AddressResponse;
import com.aman.nimbuscommerce.user.dto.request.UpdateUserRequest;
import com.aman.nimbuscommerce.user.dto.response.UserResponse;
import com.aman.nimbuscommerce.user.entity.Address;
import com.aman.nimbuscommerce.user.entity.User;
import com.aman.nimbuscommerce.user.exception.ForbiddenException;
import com.aman.nimbuscommerce.user.exception.NotFoundException;
import com.aman.nimbuscommerce.user.repository.AddressRepository;
import com.aman.nimbuscommerce.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final AddressRepository addressRepository;
    private final CurrentUser currentUser;
    private final ModelMapper modelMapper;

    public UserResponse userProfile() {
        UUID userId = currentUser.get().getUserId();
        return userProfileById(userId);
    }

    public UserResponse userProfileById(UUID id) {
        User user = userById(id);
        return modelMapper.map(user, UserResponse.class);
    }

    @Transactional
    public UserResponse updateUser(UUID id, UpdateUserRequest updateUserRequest) {
        UUID currentUserId = currentUser.get().getUserId();
        if(!currentUserId.equals(id)){
            throw new ForbiddenException("Forbidden: You don't have permission to perform this action");
        }
        User user = userRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("User not found with id "+id));
        user.setName(updateUserRequest.getName());
        user.setPassword(updateUserRequest.getPassword());
        userRepository.save(user);
        return modelMapper.map(user, UserResponse.class);
    }

    @Transactional
    public AddressResponse addAddress(AddressRequest addressRequest) {
        UUID currentUserId = currentUser.get().getUserId();
        Address address = modelMapper.map(addressRequest, Address.class);
        address.setUser(userById(currentUserId));
        Address saved = addressRepository.save(address);
        return modelMapper.map(saved, AddressResponse.class);
    }

    public List<AddressResponse> listAddress() {
        UUID currentUserId = currentUser.get().getUserId();
        List<Address> list = addressRepository.findByUserId(currentUserId);
        return list
                .stream()
                .map((address) -> modelMapper.map(address, AddressResponse.class))
                .collect(Collectors.toList());
    }

    private User userById(UUID id){
        return userRepository
                .findById(id)
                .orElseThrow(() -> new NotFoundException("User not found with id "+id));
    }
}
