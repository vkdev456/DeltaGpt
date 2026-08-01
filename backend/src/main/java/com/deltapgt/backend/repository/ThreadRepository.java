package com.deltapgt.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.deltapgt.backend.entity.Thread;

@Repository
public interface ThreadRepository extends JpaRepository<Thread, Long> {

    Optional<Thread> findByThreadId(String threadId);
    
    void deleteByThreadId(String threadId);
    
}