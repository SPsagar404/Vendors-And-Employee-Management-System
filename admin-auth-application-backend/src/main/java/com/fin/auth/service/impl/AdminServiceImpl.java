package com.fin.auth.service.impl;

import com.fin.auth.exception.EmailNotSentException;
import com.fin.auth.exception.EmployeeAlreadyExistException;
import com.fin.auth.exception.VendorAlreadyExistException;
import com.fin.auth.model.EmailLog;
import com.fin.auth.model.Employee;
import com.fin.auth.model.Vendor;
import com.fin.auth.repository.IEmailLogRepository;
import com.fin.auth.repository.IEmployeeRepository;
import com.fin.auth.repository.IVendorRepository;
import com.fin.auth.service.IAdminService;
import com.fin.auth.utils.EmailUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class AdminServiceImpl implements IAdminService {

    @Autowired
    private IEmployeeRepository employeeRepository;

    @Autowired
    private IVendorRepository vendorRepository;

    @Autowired
    private IEmailLogRepository emailLogRepository;

    @Autowired
    private EmailUtil emailUtil;

    @Override
    public Employee createEmployee(Employee employee) {
        Employee existingEmployee = employeeRepository.findByEmail(employee.getEmail());
        if(existingEmployee != null){
            throw new EmployeeAlreadyExistException("Employee already exist with email :: "+employee.getEmail());
        }
        return employeeRepository.save(employee);
    }

    @Override
    public Vendor createVendor(Vendor vendor) {
        Vendor existingVendor = vendorRepository.findByEmail(vendor.getEmail());
        if(existingVendor != null){
            throw new VendorAlreadyExistException("Vendor already exist with email :: "+vendor.getEmail());
        }
        return vendorRepository.save(vendor);
    }

    @Override
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    @Override
    public List<Vendor> getAllVendors() {
        return vendorRepository.findAll();
    }

    @Override
    public List<EmailLog> getAllSentEmails() {
        return emailLogRepository.findAll();
    }


    @Override
    public void sendEmailToVendor(List<Vendor> vendors) {

        vendors.forEach(vendor -> {

            String emailTemplate = "Sending payments to vendor "+vendor.getName()+" at upi "+vendor.getUpi();
            boolean isMailSent = emailUtil.sendEmail(vendor.getEmail(), emailTemplate);
            if(isMailSent){
                EmailLog emailLog = new EmailLog();
                emailLog.setVendor(vendor);
                emailLog.setContent(emailTemplate);
                emailLog.setSentAt(LocalDateTime.now());
                emailLogRepository.save(emailLog);
            }else {
                throw new EmailNotSentException("Email not sent to email id :: " + vendor.getEmail());
            }
        });
    }


}
