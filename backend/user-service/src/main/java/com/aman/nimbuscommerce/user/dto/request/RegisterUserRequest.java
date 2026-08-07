package com.aman.nimbuscommerce.user.dto.request;

import com.aman.nimbuscommerce.user.entity.Role;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegisterUserRequest {

    @NotBlank(message = "Name is required")
    @Size(min = 4, message = "Name must be minimum 4 character long")
    private String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Please enter a valid email address")
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min = 4, max = 128, message = "Password must be between 4 and 128 characters")
    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;
}