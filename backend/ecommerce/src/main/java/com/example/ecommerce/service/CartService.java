package com.example.ecommerce.service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ecommerce.entity.Cart;
import com.example.ecommerce.entity.Product;
import com.example.ecommerce.repository.CartRepository;
import com.example.ecommerce.repository.ProductRepository;

@Service
public class CartService {

	@Autowired
	private ProductRepository productRepository;
    @Autowired
    private CartRepository repo;

    public Cart addToCart(Cart cart) {

        // Find Product
        Product product = productRepository
                .findById(cart.getProductId())
                .orElseThrow();

        // Stock Validation
        if (cart.getQuantity() > product.getInventoryCount()) {
            throw new RuntimeException("Not enough stock");
        }

        // Calculate Total Price
        BigDecimal total = product.getPrice().multiply(
                BigDecimal.valueOf(cart.getQuantity())
        );

        cart.setTotalPrice(total);

        // Timestamps
        cart.setCreatedAt(LocalDateTime.now());
        cart.setUpdatedAt(LocalDateTime.now());

        return repo.save(cart);
    }
    public Cart updateCart(Long id, Integer quantity) {

        Cart cart = repo.findById(id).orElseThrow();

        Product product = productRepository
                .findById(cart.getProductId())
                .orElseThrow();

        // Stock Validation
        if (quantity > product.getInventoryCount()) {
            throw new RuntimeException("Not enough stock");
        }

        // Update Quantity
        cart.setQuantity(quantity);

        // Recalculate Total Price
        BigDecimal total = product.getPrice().multiply(
                BigDecimal.valueOf(quantity)
        );

        cart.setTotalPrice(total);

        // Update Timestamp
        cart.setUpdatedAt(LocalDateTime.now());

        return repo.save(cart);
    }
    
    public void removeCartItem(Long id) {

        Cart cart = repo.findById(id).orElseThrow();

        repo.delete(cart);
    }
    

    public List<Map<String, Object>> getUserCart(Long userId) {

        List<Cart> cartItems = repo.findByUserId(userId);
        List<Map<String, Object>> result = new ArrayList<>();

        for (Cart item : cartItems) {
            Map<String, Object> map = new HashMap<>();

            Product product = productRepository
                    .findById(item.getProductId())
                    .orElse(null);

            map.put("cartId", item.getCartId());
            map.put("productName", product != null ? product.getProductName() : "Unknown");
            map.put("quantity", item.getQuantity());
            map.put("price", product != null ? product.getPrice() : 0);
            map.put("totalPrice", item.getTotalPrice());

            result.add(map);
        }

        return result;
    }

    public void clearCart(Long userId) {
        List<Cart> items = repo.findByUserId(userId);
        repo.deleteAll(items);
    }

	public ProductRepository getProductRepository() {
		return productRepository;
	}

	public void setProductRepository(ProductRepository productRepository) {
		this.productRepository = productRepository;
	}
}