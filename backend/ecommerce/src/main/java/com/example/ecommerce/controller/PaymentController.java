package com.example.ecommerce.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.ecommerce.entity.Payment;
import com.example.ecommerce.service.PaymentService;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    @Autowired
    private PaymentService service;

    // Process Payment
    @PostMapping
    public Payment processPayment(@RequestBody Payment payment) {
        return service.processPayment(payment);
    }

    // Payment Dashboard / Transaction History
    @GetMapping
    public List<Payment> getAllPayments() {
        return service.getAllPayments();
    }

    // Refund Payment
    @PatchMapping("/{paymentId}/refund")
    public Payment refundPayment(@PathVariable Long paymentId) {
        return service.refundPayment(paymentId);
    }
}