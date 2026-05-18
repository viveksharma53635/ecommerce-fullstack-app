package com.example.ecommerce.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.ecommerce.entity.Review;

public interface ReviewRepository
        extends JpaRepository<Review, Long> {

    // Get reviews by product
    List<Review> findByProductId(
            Long productId
    );

    // Get only approved reviews
    List<Review> findByProductIdAndStatus(
            Long productId,
            Boolean status
    );
}