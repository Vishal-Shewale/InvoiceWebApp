package com.eduford.Spring_Boot.Eduford.Controller;

import com.eduford.Spring_Boot.Eduford.Entity.Invoice;
import com.eduford.Spring_Boot.Eduford.Service.InvoiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/invoices")
@CrossOrigin(origins = "http://localhost:5173/")
public class InvoiceController {
    @Autowired
    private InvoiceService invoiceService;

    @GetMapping("/viewall")
    public List<Invoice> getAllInvoices() {
        return invoiceService.getAllInvoices();
    }

    @PostMapping("/createInvoice")
    public Invoice createInvoice(@RequestBody  Invoice invoice) {
        return invoiceService.createInvoice(invoice);
    }

    //  Creating for the autosuggestion in the front end (Under Working)
//    @GetMapping("/search")
//    public List<Buyer> searchBuyers(@RequestParam String searchTerm) {
//        return invoiceService.searchBuyers(searchTerm);
//    }

    @DeleteMapping("/delete/{id}")
    public void deleteInvoice(@PathVariable Long id)
    {
        invoiceService.deleteInvoice(id);
    }


}
