package com.aman.nimbuscommerce.user.controller;

import com.aman.nimbuscommerce.user.dto.response.SuccessResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/health")
public class HealthController {
    @GetMapping
    public ResponseEntity<SuccessResponse<Void>> health(){
        return SuccessResponse.ok("Server is up and running");
    }
}
