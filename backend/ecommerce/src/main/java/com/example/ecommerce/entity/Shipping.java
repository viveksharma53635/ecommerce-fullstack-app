package com.example.ecommerce.entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import jakarta.persistence.*;

@Entity
@Table(name = "shipping")
public class Shipping {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long shippingId;

    private Long orderId;

    private String courierService;

    @Column(unique = true)
    private String trackingNumber;

    private String shippingStatus;

    private BigDecimal shippingCost;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    public Shipping() {
    }

    @PrePersist
    protected void onCreate() {

        createdAt = LocalDateTime.now();

        updatedAt = LocalDateTime.now();

        shippingStatus = "Shipped";

        trackingNumber =
            "TRK" + System.currentTimeMillis();
    }
    
    @PreUpdate
    protected void onUpdate() {

        updatedAt = LocalDateTime.now();
    }

    // Getters & Setters

    public Long getShippingId() {
        return shippingId;
    }

    public void setShippingId(Long shippingId) {
        this.shippingId = shippingId;
    }

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public String getCourierService() {
        return courierService;
    }

    public void setCourierService(String courierService) {
        this.courierService = courierService;
    }

    public String getTrackingNumber() {
        return trackingNumber;
    }

    public void setTrackingNumber(String trackingNumber) {
        this.trackingNumber = trackingNumber;
    }

    public String getShippingStatus() {
        return shippingStatus;
    }

    public void setShippingStatus(String shippingStatus) {
        this.shippingStatus = shippingStatus;
    }

    public BigDecimal getShippingCost() {
        return shippingCost;
    }

    public void setShippingCost(BigDecimal shippingCost) {
        this.shippingCost = shippingCost;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}