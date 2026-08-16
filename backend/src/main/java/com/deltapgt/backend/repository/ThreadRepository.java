package com.deltapgt.backend.repository;

import java.util.*;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.deltapgt.backend.entity.Thread;
import com.deltapgt.backend.entity.User;
import org.springframework.data.domain.Sort;

@Repository
public interface ThreadRepository extends JpaRepository<Thread, Long> {

    Optional<Thread> findByThreadId(String threadId);
    
    void deleteByThreadId(String threadId);

    List<Thread> findByUser(User user, Sort sort);
    
}