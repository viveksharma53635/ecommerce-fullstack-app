package com.example.ecommerce.config;

import com.example.ecommerce.entity.Category;
import com.example.ecommerce.repository.CategoryRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {
    private final CategoryRepository categoryRepository;

    public DataInitializer(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public void run(String... args) {
        createCategoryIfMissing("Electronics");
        createCategoryIfMissing("Fashion");
        createCategoryIfMissing("Home");
        createCategoryIfMissing("Beauty");
    }

    private void createCategoryIfMissing(String name) {
        if (!categoryRepository.existsByCategoryName(name)) {
            categoryRepository.save(new Category(name));
        }
    }
}
