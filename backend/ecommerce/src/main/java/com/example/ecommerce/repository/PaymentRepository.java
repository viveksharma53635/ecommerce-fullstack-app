package com.example.ecommerce.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.ecommerce.entity.Payment;

public interface PaymentRepository extends JpaRepository<Payment, Long> {

    // Get payments by order id
    List<Payment> findByOrderId(Long orderId);
}