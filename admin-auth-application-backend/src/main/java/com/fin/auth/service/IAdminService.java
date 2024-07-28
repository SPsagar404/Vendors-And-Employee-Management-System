package com.fin.auth.service;

import com.fin.auth.model.EmailLog;
import com.fin.auth.model.Employee;
import com.fin.auth.model.Vendor;

import java.util.List;

public interface IAdminService {

    Employee createEmployee(Employee employee);
    Vendor createVendor(Vendor vendor);
    List<Employee> getAllEmployees();
    List<Vendor> getAllVendors();
    List<EmailLog> getAllSentEmails();
    void sendEmailToVendor(List<Vendor> vendors);
}
