package com.example.ecommerce.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.ecommerce.entity.Shipping;

public interface ShippingRepository
        extends JpaRepository<Shipping, Long> {

    // Track shipment by tracking number
    Optional<Shipping> findByTrackingNumber(
            String trackingNumber
    );
}