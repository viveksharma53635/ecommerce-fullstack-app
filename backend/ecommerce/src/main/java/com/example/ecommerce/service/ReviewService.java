package com.example.ecommerce.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ecommerce.entity.Review;
import com.example.ecommerce.repository.ReviewRepository;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository repo;

    // Add Review
    public Review addReview(
            Review review
    ) {

        // Rating Validation
        if (
            review.getRating() < 1 ||
            review.getRating() > 5
        ) {

            throw new RuntimeException(
                "Rating must be between 1 and 5"
            );
        }

        review.setCreatedAt(
                LocalDateTime.now()
        );

        review.setUpdatedAt(
                LocalDateTime.now()
        );

        // Default pending approval
        review.setStatus(false);

        return repo.save(review);
    }

    // Get Approved Product Reviews
    public List<Review> getProductReviews(
            Long productId
    ) {

        return repo.findByProductIdAndStatus(
                productId,
                true
        );
    }

    // Get All Reviews (Admin)
    public List<Review> getAllReviews() {

        return repo.findAll();
    }

    // Approve Review
    public Review approveReview(
            Long id
    ) {

        Review review =
                repo.findById(id)
                .orElseThrow();

        review.setStatus(true);

        review.setUpdatedAt(
                LocalDateTime.now()
        );

        return repo.save(review);
    }

    // Update Review
    public Review updateReview(
            Long id,
            Review updatedReview
    ) {

        Review review =
                repo.findById(id)
                .orElseThrow();

        review.setRating(
                updatedReview.getRating()
        );

        review.setReviewText(
                updatedReview.getReviewText()
        );

        review.setUpdatedAt(
                LocalDateTime.now()
        );

        return repo.save(review);
    }

    // Delete Review
    public void deleteReview(
            Long id
    ) {

        Review review =
                repo.findById(id)
                .orElseThrow();

        repo.delete(review);
    }
}