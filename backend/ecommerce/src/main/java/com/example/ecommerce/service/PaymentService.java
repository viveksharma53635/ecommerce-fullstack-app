package com.example.ecommerce.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ecommerce.entity.Payment;
import com.example.ecommerce.entity.Shipping;
import com.example.ecommerce.repository.PaymentRepository;
import com.example.ecommerce.repository.ShippingRepository;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository repo;
    @Autowired
    private ShippingRepository shippingRepository;

    // Process Payment
    public Payment processPayment(Payment payment) {

        payment.setCreatedAt(LocalDateTime.now());

        payment.setUpdatedAt(LocalDateTime.now());

        // Default payment status
        payment.setPaymentStatus("Paid");

        // Save payment first
        Payment savedPayment = repo.save(payment);

        // Create shipping automatically
        Shipping shipping = new Shipping();

        shipping.setOrderId(
                payment.getOrderId()
        );

        shipping.setCourierService(
                "Delhivery"
        );

        shippingRepository.save(shipping);

        // Return saved payment
        return savedPayment;
    }
    // Get All Payments
    public List<Payment> getAllPayments() {
        return repo.findAll();
    }

    // Refund Payment
    public Payment refundPayment(Long paymentId) {

        Payment payment = repo.findById(paymentId).orElseThrow();

        payment.setPaymentStatus("Refunded");
        payment.setUpdatedAt(LocalDateTime.now());

        return repo.save(payment);
    }
    
    
}