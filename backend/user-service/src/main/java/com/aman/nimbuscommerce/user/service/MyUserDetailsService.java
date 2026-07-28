package com.aman.nimbuscommerce.user.service;

import com.aman.nimbuscommerce.user.entity.User;
import com.aman.nimbuscommerce.user.entity.UserPrinciple;
import com.aman.nimbuscommerce.user.exception.NotFoundException;
import com.aman.nimbuscommerce.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.jspecify.annotations.NonNull;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MyUserDetailsService implements UserDetailsService {
    private final UserRepository userRepository;
    @Override
    public UserDetails loadUserByUsername(@NonNull String username) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(username)
                .orElseThrow(() ->
                        new NotFoundException("User not found"));
        return new UserPrinciple(user);
    }
}
