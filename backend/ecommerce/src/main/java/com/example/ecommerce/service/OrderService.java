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
import com.example.ecommerce.entity.Order;
import com.example.ecommerce.entity.Product;
import com.example.ecommerce.entity.User;
import com.example.ecommerce.repository.CartRepository;
import com.example.ecommerce.repository.OrderRepository;
import com.example.ecommerce.repository.ProductRepository;
import com.example.ecommerce.repository.UserRepository;

@Service
public class OrderService {

    @Autowired
    private OrderRepository repo;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private ProductRepository productRepository;

    // Place Order
    public Order create(Order order) {
    	

        // 1. Get cart items for user
        List<Cart> cartItems = cartRepository.findByUserId(order.getCustomerId());
        if (cartItems.isEmpty()) {
    	    throw new RuntimeException("Cart is empty");
    	}

        // 2. Calculate total
        BigDecimal total = BigDecimal.ZERO;

        for (Cart item : cartItems) {
            Product product = productRepository.findById(item.getProductId()).orElseThrow();

            BigDecimal itemTotal = product.getPrice().multiply(
                    BigDecimal.valueOf(item.getQuantity())
            );

            total = total.add(itemTotal);
        }

        // 3. Set calculated total
        order.setTotalAmount(total);

        // 4. Set other fields
        order.setCreatedAt(LocalDateTime.now());
        order.setUpdatedAt(LocalDateTime.now());
        order.setStatus(true);
        order.setOrderStatus("Pending");

        // 5. Save order
        Order savedOrder = repo.save(order);

        // 6. Clear cart after order placed
        cartRepository.deleteAll(cartItems);

        return savedOrder;
    }

    // Get All Orders
    public List<Map<String, Object>> getAll() {
        List<Order> orders = repo.findAll();

        List<Map<String, Object>> result = new ArrayList<>();

        for (Order order : orders) {

            Map<String, Object> map = new HashMap<>();

            map.put("userId", order.getUserId());
            map.put("customerId", order.getCustomerId());

            // 🔥 Fetch name from users table
            if (order.getCustomerId() != null) {
                User user = userRepository.findById(order.getCustomerId()).orElse(null);
                map.put("customerName", user != null ? user.getName() : "Unknown");
            } else {
                map.put("customerName", "Unknown");
            }

            map.put("totalAmount", order.getTotalAmount());
            map.put("orderStatus", order.getOrderStatus());
            map.put("shippingAddress", order.getShippingAddress());

            result.add(map);
        }

        return result;
    }

    // Update Order Status
    public Order updateStatus(Long id, String status) {
        Order order = repo.findById(id).orElseThrow();
        order.setOrderStatus(status);
        order.setUpdatedAt(LocalDateTime.now());
        return repo.save(order);
    }

    // Cancel Order (Soft Delete with condition)
    public Order cancel(Long id) {
        Order order = repo.findById(id).orElseThrow();

        if ("Shipped".equals(order.getOrderStatus())) {
            throw new RuntimeException("Cannot cancel shipped order");
        }

        order.setOrderStatus("Cancelled");
        order.setStatus(false);
        order.setUpdatedAt(LocalDateTime.now());

        return repo.save(order);
    }

    // Filter Orders
    public List<Order> getByStatus(String status) {
        return repo.findByOrderStatus(status);
    }

	public UserRepository getUserRepository() {
		return userRepository;
	}

	public void setUserRepository(UserRepository userRepository) {
		this.userRepository = userRepository;
	}
}