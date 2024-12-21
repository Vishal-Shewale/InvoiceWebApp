package com.eduford.Spring_Boot.Eduford.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Entity
@Data
@Table(name = "invoices")
@NoArgsConstructor
@AllArgsConstructor
public class Invoice {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id;

    private String invoiceNo;

    private LocalDate date;
    private String supplierName;
    private String supplierAddress;
    private String supplierGSTIN;
    private String supplierIEC;
    private String buyerName;
    private String buyerAddress;
    private String buyerGSTIN;
    private String paymentTerms;
    private String paymentMode;
    private String dispatchMethod;
    private String destination;
    private Double cgstRate;
    private Double sgstRate;
    private Double totalAmount;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "invoice_id")
    private List<InvoiceItem> items;



}
