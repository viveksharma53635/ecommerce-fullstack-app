package com.example.ecommerce.service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ecommerce.entity.Cart;
import com.example.ecommerce.entity.Product;
import com.example.ecommerce.entity.Wishlist;
import com.example.ecommerce.repository.CartRepository;
import com.example.ecommerce.repository.ProductRepository;
import com.example.ecommerce.repository.WishlistRepository;

@Service
public class WishlistService {

    @Autowired
    private WishlistRepository repo;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CartRepository cartRepository;

    // Add to Wishlist
    public Wishlist addToWishlist(Wishlist wishlist) {

        return repo.save(wishlist);
    }

    // View Wishlist
    public List<Map<String, Object>> getWishlist(Long customerId) {

        List<Wishlist> items =
                repo.findByCustomerId(customerId);

        List<Map<String, Object>> result =
                new ArrayList<>();

        for (Wishlist item : items) {

            Map<String, Object> map =
                    new HashMap<>();

            Product product =
                    productRepository
                    .findById(item.getProductId())
                    .orElse(null);

            map.put(
                    "wishlistId",
                    item.getWishlistId()
            );

            map.put(
                    "productId",
                    item.getProductId()
            );

            map.put(
                    "productName",
                    product != null
                    ? product.getProductName()
                    : "Unknown"
            );

            map.put(
                    "price",
                    product != null
                    ? product.getPrice()
                    : 0
            );

            map.put(
                    "availability",
                    product != null &&
                    product.getInventoryCount() > 0
                    ? "In Stock"
                    : "Out of Stock"
            );

            result.add(map);
        }

        return result;
    }

    // Remove Wishlist Item
    public void removeWishlist(Long id) {

        Wishlist wishlist =
                repo.findById(id).orElseThrow();

        repo.delete(wishlist);
    }

    // Move Wishlist → Cart
    public void moveToCart(Long wishlistId) {

        Wishlist wishlist =
                repo.findById(wishlistId)
                .orElseThrow();

        Product product =
                productRepository
                .findById(wishlist.getProductId())
                .orElseThrow();

        Cart cart = new Cart();

        cart.setUserId(
                wishlist.getCustomerId()
        );

        cart.setProductId(
                wishlist.getProductId()
        );

        cart.setQuantity(1);

        BigDecimal total =
                product.getPrice();

        cart.setTotalPrice(total);

        cartRepository.save(cart);

        // Remove from wishlist
        repo.delete(wishlist);
    }
}