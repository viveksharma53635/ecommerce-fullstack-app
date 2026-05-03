package com.example.ecommerce.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.ecommerce.entity.Cart;
import com.example.ecommerce.service.CartService;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "http://localhost:5173")
public class CartController {

    @Autowired
    private CartService service;

    @PostMapping
    public Cart add(@RequestBody Cart cart) {
        return service.addToCart(cart);
    }

    @GetMapping("/{userId}")
    public List<Map<String, Object>> get(@PathVariable Long userId) {
        return service.getUserCart(userId);
    }
}
