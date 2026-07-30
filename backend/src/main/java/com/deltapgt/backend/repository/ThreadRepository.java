package com.deltapgt.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.deltapgt.backend.entity.Thread;

@Repository
public interface ThreadRepository  extends JpaRepository<Thread, Long>{

}