package com.example.ecommerce.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.ecommerce.entity.User;
import com.example.ecommerce.service.UserService;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService service;

    // Add Customer
    @PostMapping
    public User create(@RequestBody User user) {
        return service.create(user);
    }

    // Get All Customers
    @GetMapping
    public List<User> getAll() {
        return service.getAll();
    }

    // Update Customer
    @PutMapping("/{id}")
    public User update(@PathVariable Long id, @RequestBody User user) {
        return service.update(id, user);
    }

    // Deactivate Customer
    @PatchMapping("/{id}/deactivate")
    public User deactivate(@PathVariable Long id) {
        return service.deactivate(id);
    }
}