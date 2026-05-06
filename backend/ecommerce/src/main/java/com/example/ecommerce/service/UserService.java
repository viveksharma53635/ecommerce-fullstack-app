package com.example.ecommerce.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ecommerce.entity.User;
import com.example.ecommerce.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository repo;

    // Add Customer
    public User create(User user) {
        user.setCreatedAt(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());
        user.setStatus(true);
        return repo.save(user);
    }

    // Get All Customers
    public List<User> getAll() {
        return repo.findAll();
    }

    // Update Customer
    public User update(Long id, User updatedUser) {
        User user = repo.findById(id).orElseThrow();

        user.setFirstName(updatedUser.getFirstName());
        user.setLastName(updatedUser.getLastName());
        user.setEmail(updatedUser.getEmail());
        user.setPhone(updatedUser.getPhone());
        user.setUpdatedAt(LocalDateTime.now());

        return repo.save(user);
    }

    // Soft Delete (Deactivate)
    public User deactivate(Long id) {
        User user = repo.findById(id).orElseThrow();
        user.setStatus(false);
        user.setUpdatedAt(LocalDateTime.now());
        return repo.save(user);
    }
}