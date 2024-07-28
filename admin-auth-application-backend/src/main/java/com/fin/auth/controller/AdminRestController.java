package com.fin.auth.controller;

import com.fin.auth.model.EmailLog;
import com.fin.auth.model.Employee;
import com.fin.auth.model.Vendor;
import com.fin.auth.service.IAdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin")
//@CrossOrigin("*")
public class AdminRestController {

    @Autowired
    private IAdminService service;

    @PostMapping("/employees")
    public ResponseEntity<Employee> createEmployee(@RequestBody Employee employee) {
        return ResponseEntity.ok(service.createEmployee(employee));
    }

    @PostMapping("/vendors")
    public ResponseEntity<Vendor> createVendor(@RequestBody Vendor vendor) {
        return ResponseEntity.ok(service.createVendor(vendor));
    }

    @PostMapping("/emails")
    public ResponseEntity<?> sendEmailsToVendors(@RequestBody List<Long> vendorIds) {
        //System.out.println(vendorIds);
        List<Vendor> vendors = service.getAllVendors().stream()
                .filter(vendor -> vendorIds.contains(vendor.getId()))
                .collect(Collectors.toList());
        service.sendEmailToVendor(vendors);
        return ResponseEntity.ok("Emails sent successfully");
    }

    @GetMapping("/emails")
    public ResponseEntity<List<EmailLog>> getAllEmailLogs() {
        return ResponseEntity.ok(service.getAllSentEmails());
    }

    @GetMapping("/employees")
    public ResponseEntity<List<Employee>> getAllEmployees() {
        return ResponseEntity.ok(service.getAllEmployees());
    }

    @GetMapping("/vendors")
    public ResponseEntity<List<Vendor>> getAllVendors() {

        return ResponseEntity.ok(service.getAllVendors());
    }
}
