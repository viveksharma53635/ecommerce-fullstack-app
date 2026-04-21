package com.example.ecommerce.service;

import com.example.ecommerce.entity.Product;
import com.example.ecommerce.repository.CategoryRepository;
import com.example.ecommerce.repository.ProductRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductService {
    private final ProductRepository repo;
    private final CategoryRepository categoryRepository;

    @Autowired
    public ProductService(ProductRepository repo, CategoryRepository categoryRepository) {
        this.repo = repo;
        this.categoryRepository = categoryRepository;
    }

    public Product save(Product product, Long categoryId) {
        product.setCategory(categoryRepository.findById(categoryId).orElseThrow());
        return repo.save(product);
    }

    public List<Product> getAll() {
        return repo.findAll();
    }

    public Product update(Long id, Product updated) {
        Product p = repo.findById(id).orElseThrow();
        p.setProductName(updated.getProductName());
        p.setPrice(updated.getPrice());
        p.setInventoryCount(updated.getInventoryCount());
        p.setDescription(updated.getDescription());
        return repo.save(p);
    }

    public Product deactivate(Long id) {
        Product p = repo.findById(id).orElseThrow();
        p.setStatus(false);
        return repo.save(p);
    }
}
