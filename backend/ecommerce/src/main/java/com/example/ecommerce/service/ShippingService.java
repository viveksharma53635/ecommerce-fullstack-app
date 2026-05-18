package com.example.ecommerce.service;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ecommerce.entity.Shipping;
import com.example.ecommerce.repository.ShippingRepository;

@Service
public class ShippingService {

    @Autowired
    private ShippingRepository repo;

    // Create Shipping
    public Shipping createShipping(
            Shipping shipping
    ) {

        // Shipping Cost Calculation
        BigDecimal shippingCost =
                calculateShippingCost(
                        shipping.getCourierService()
                );

        shipping.setShippingCost(
                shippingCost
        );

        // Generate Tracking Number
        shipping.setTrackingNumber(
                "TRK" + System.currentTimeMillis()
        );

        shipping.setShippingStatus(
                "Shipped"
        );

        return repo.save(shipping);
    }

    // Shipping Cost Logic
    public BigDecimal calculateShippingCost(
            String courier
    ) {

        if ("Express".equalsIgnoreCase(courier)) {

            return BigDecimal.valueOf(200);

        } else if ("Delhivery".equalsIgnoreCase(courier)) {

            return BigDecimal.valueOf(100);

        } else {

            return BigDecimal.valueOf(50);
        }
    }

    // Get All Shipping
    public List<Shipping> getAllShipping() {

        return repo.findAll();
    }

    // Track Shipment
    public Shipping trackShipment(
            String trackingNumber
    ) {

        return repo.findByTrackingNumber(
                trackingNumber
        ).orElseThrow();
    }

    // Update Shipping Status
    public Shipping updateShippingStatus(
            Long id,
            String status
    ) {

        Shipping shipping =
                repo.findById(id).orElseThrow();

        shipping.setShippingStatus(status);

        return repo.save(shipping);
    }
}