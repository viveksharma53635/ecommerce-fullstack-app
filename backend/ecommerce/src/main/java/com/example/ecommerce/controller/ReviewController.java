package com.example.ecommerce.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.ecommerce.entity.Review;
import com.example.ecommerce.service.ReviewService;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    @Autowired
    private ReviewService service;

    // Add Review
    @PostMapping
    public Review addReview(
            @RequestBody Review review
    ) {

        return service.addReview(review);
    }

    // View Product Reviews
    @GetMapping("/product/{productId}")
    public List<Review> getProductReviews(
            @PathVariable Long productId
    ) {

        return service.getProductReviews(
                productId
        );
    }

    // Get All Reviews (Admin)
    @GetMapping
    public List<Review> getAllReviews() {

        return service.getAllReviews();
    }

    // Approve Review
    @PutMapping("/{id}/approve")
    public Review approveReview(
            @PathVariable Long id
    ) {

        return service.approveReview(id);
    }

    // Update Review
    @PutMapping("/{id}")
    public Review updateReview(
            @PathVariable Long id,
            @RequestBody Review review
    ) {

        return service.updateReview(
                id,
                review
        );
    }

    // Delete Review
    @DeleteMapping("/{id}")
    public void deleteReview(
            @PathVariable Long id
    ) {

        service.deleteReview(id);
    }
}