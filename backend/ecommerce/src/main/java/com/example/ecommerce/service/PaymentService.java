package com.example.ecommerce.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ecommerce.entity.Payment;
import com.example.ecommerce.repository.PaymentRepository;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository repo;

    // Process Payment
    public Payment processPayment(Payment payment) {

        payment.setCreatedAt(LocalDateTime.now());
        payment.setUpdatedAt(LocalDateTime.now());

        // Default status
        payment.setPaymentStatus("Paid");

        return repo.save(payment);
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