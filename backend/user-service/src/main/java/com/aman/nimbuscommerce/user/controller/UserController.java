package com.aman.nimbuscommerce.user.controller;

import com.aman.nimbuscommerce.user.dto.request.AddressRequest;
import com.aman.nimbuscommerce.user.dto.request.UpdateUserRequest;
import com.aman.nimbuscommerce.user.dto.response.AddressResponse;
import com.aman.nimbuscommerce.user.dto.response.SuccessResponse;
import com.aman.nimbuscommerce.user.dto.response.UserResponse;
import com.aman.nimbuscommerce.user.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping("/me")
    public ResponseEntity<SuccessResponse<UserResponse>> getUserProfile(){
        return SuccessResponse.ok(userService.userProfile(), "User fetched");
    }

    @GetMapping("/{id}")
    public ResponseEntity<SuccessResponse<UserResponse>> getUserProfile(@PathVariable UUID id){
        return SuccessResponse.ok(userService.userProfileById(id),"User fetched with id "+id);
    }

    @PutMapping("/me/{id}")
    public ResponseEntity<SuccessResponse<UserResponse>> updateUserProfile(
            @PathVariable UUID id,
            @Valid @RequestBody UpdateUserRequest updateUserRequest
            ){
        return SuccessResponse.ok(userService.updateUser(id, updateUserRequest),"User updated");
    }

    @PostMapping("/addresses")
    public ResponseEntity<SuccessResponse<AddressResponse>> addUserAddress(
            @Valid @RequestBody AddressRequest addressRequest
            ){
        return SuccessResponse.ok(userService.addAddress(addressRequest), "Address added");
    }

    @GetMapping("/addresses")
    public ResponseEntity<SuccessResponse<List<AddressResponse>>> getAllAddress(){
        return SuccessResponse.ok(userService.listAddress(), "Address fetched");
    }
}
