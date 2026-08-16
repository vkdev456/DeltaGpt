package com.deltapgt.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.deltapgt.backend.entity.User;

@Repository
public interface UserRepositorty extends JpaRepository<User,Long>{

    User getByUsername(String username);
    
    
} 