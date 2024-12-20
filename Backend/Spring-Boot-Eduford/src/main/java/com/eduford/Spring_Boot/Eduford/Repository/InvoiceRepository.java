package com.eduford.Spring_Boot.Eduford.Repository;

import com.eduford.Spring_Boot.Eduford.Entity.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InvoiceRepository extends JpaRepository<Invoice,Long> {
}
