package com.example.ecommerce.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.ecommerce.entity.Shipping;
import com.example.ecommerce.service.ShippingService;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/shipping")
public class ShippingController {

    @Autowired
    private ShippingService service;

    // Create Shipping
    @PostMapping
    public Shipping createShipping(
            @RequestBody Shipping shipping
    ) {
        return service.createShipping(shipping);
    }

    // Get All Shipping
    @GetMapping
    public List<Shipping> getAllShipping() {
        return service.getAllShipping();
    }

    // Track Shipment
    @GetMapping("/track/{trackingNumber}")
    public Shipping trackShipment(
            @PathVariable String trackingNumber
    ) {
        return service.trackShipment(trackingNumber);
    }

    // Update Shipping Status
    @PutMapping("/{id}/status")
    public Shipping updateShippingStatus(
            @PathVariable Long id,
            @RequestParam String status
    ) {
        return service.updateShippingStatus(
                id,
                status
        );
    }
}