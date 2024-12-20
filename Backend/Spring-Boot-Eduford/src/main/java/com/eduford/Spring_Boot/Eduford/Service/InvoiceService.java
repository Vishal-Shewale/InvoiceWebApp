package com.eduford.Spring_Boot.Eduford.Service;

import com.eduford.Spring_Boot.Eduford.Entity.Invoice;
import com.eduford.Spring_Boot.Eduford.Repository.InvoiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Service
public class InvoiceService {
    @Autowired
    private InvoiceRepository invoiceRepository;


    public List<Invoice> getAllInvoices() {
        return invoiceRepository.findAll();
    }


    @PostMapping("/createInvoice")
    public Invoice createInvoice(@RequestBody Invoice invoice) {

        double totalBeforeTax = 0;


        for (int i = 0; i < invoice.getItems().size(); i++) {
            totalBeforeTax += invoice.getItems().get(i).getAmount();
        }


        double cgstAmount = totalBeforeTax * (invoice.getCgstRate() / 100);
        double sgstAmount = totalBeforeTax * (invoice.getSgstRate() / 100);


        double totalAmount = totalBeforeTax + cgstAmount + sgstAmount;


        invoice.setTotalAmount(totalAmount);


        return invoiceRepository.save(invoice);
    }


    public Invoice getInvoiceById(Long id) {
        return invoiceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Invoice not found"));
    }


    public void deleteInvoice(Long id) {
        invoiceRepository.deleteById(id);
    }
}
