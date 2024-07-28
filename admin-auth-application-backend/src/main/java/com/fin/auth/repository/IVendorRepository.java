package com.fin.auth.repository;

import com.fin.auth.model.Vendor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IVendorRepository extends JpaRepository<Vendor,Long> {

     Vendor findByEmail(String email);

}
