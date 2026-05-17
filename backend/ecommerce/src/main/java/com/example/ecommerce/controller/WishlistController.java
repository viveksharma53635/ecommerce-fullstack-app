package com.example.ecommerce.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.ecommerce.entity.Wishlist;
import com.example.ecommerce.service.WishlistService;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/wishlist")
public class WishlistController {

    @Autowired
    private WishlistService service;

    // Add to Wishlist
    @PostMapping
    public Wishlist addToWishlist(
            @RequestBody Wishlist wishlist
    ) {
        return service.addToWishlist(wishlist);
    }

    // View Wishlist
    @GetMapping("/{customerId}")
    public List<Map<String, Object>> getWishlist(
            @PathVariable Long customerId
    ) {
        return service.getWishlist(customerId);
    }

    // Remove Wishlist Item
    @DeleteMapping("/{id}")
    public void removeWishlist(
            @PathVariable Long id
    ) {
        service.removeWishlist(id);
    }

    // Move Wishlist → Cart
    @PostMapping("/{wishlistId}/move-to-cart")
    public void moveToCart(
            @PathVariable Long wishlistId
    ) {
        service.moveToCart(wishlistId);
    }
}