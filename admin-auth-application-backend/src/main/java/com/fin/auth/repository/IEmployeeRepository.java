package com.fin.auth.repository;

import com.fin.auth.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IEmployeeRepository extends JpaRepository<Employee,Long> {

    public Employee findByEmail(String email);
}
