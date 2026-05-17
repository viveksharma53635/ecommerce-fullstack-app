package com.example.ecommerce.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.ecommerce.entity.Wishlist;

public interface WishlistRepository
        extends JpaRepository<Wishlist, Long> {

    // Get wishlist by customer
    List<Wishlist> findByCustomerId(Long customerId);
}