package com.aman.nimbuscommerce.user.config;

import com.aman.nimbuscommerce.user.entity.UserPrinciple;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class CurrentUser {

    public UserPrinciple get() {
        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        return (UserPrinciple) authentication.getPrincipal();
    }
}
