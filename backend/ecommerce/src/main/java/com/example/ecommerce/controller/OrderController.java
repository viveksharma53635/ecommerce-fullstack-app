package com.example.ecommerce.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.ecommerce.entity.Order;
import com.example.ecommerce.service.OrderService;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService service;

    // Place Order
    @PostMapping
    public Order create(@RequestBody Order order) {
        return service.create(order);
    }

    // Get All Orders
    @GetMapping
    public List<Map<String, Object>> getAll() {
        return service.getAll();
    }

    // Update Status
    @PutMapping("/{id}/status")
    public Order updateStatus(@PathVariable Long id, @RequestParam String status) {
        return service.updateStatus(id, status);
    }

    // Cancel Order
    @PatchMapping("/{id}/cancel")
    public Order cancel(@PathVariable Long id) {
        return service.cancel(id);
    }
    @GetMapping("/status")
    public List<Order> getByStatus(@RequestParam String status) {
        return service.getByStatus(status);
    }
}
