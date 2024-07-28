package com.fin.auth.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
public class EmailLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String content;

    private LocalDateTime sentAt;

    @ManyToOne
    @JoinColumn(name = "vendor_email", nullable = false)
    private Vendor vendor;

    // Getters and Setters
}