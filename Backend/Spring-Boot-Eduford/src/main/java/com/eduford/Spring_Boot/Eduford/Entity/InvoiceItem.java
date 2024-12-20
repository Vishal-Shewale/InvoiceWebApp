package com.eduford.Spring_Boot.Eduford.Entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "invoice_items")
public class InvoiceItem {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;
        private String hsnCode;
        private String particular;
        private Integer quantity;
        private Double rate;
        private String unit;
        private Double amount;
    }


