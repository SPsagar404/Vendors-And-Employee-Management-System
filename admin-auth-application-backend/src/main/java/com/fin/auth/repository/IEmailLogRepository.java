package com.fin.auth.repository;

import com.fin.auth.model.EmailLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IEmailLogRepository extends JpaRepository<EmailLog,Long> {
}
