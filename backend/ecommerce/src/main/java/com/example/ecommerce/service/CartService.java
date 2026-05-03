package com.example.ecommerce.service;

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
        return repo.save(cart);
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