package com.deltapgt.backend.service;

import java.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import com.deltapgt.backend.entity.Thread;
import org.springframework.stereotype.Service;
import com.deltapgt.backend.repository.ThreadRepository;
import jakarta.transaction.Transactional;

@Service
public class ThreadService{

    @Autowired
    ThreadRepository threadRepo;

    public List<Thread> getAllThreads() {
        return threadRepo.findAll(
                    Sort.by(Sort.Direction.DESC,"updatedAt")
        );
    }
    
    public Thread getThread(String threadId) {
            return threadRepo.findByThreadId(threadId)
                    .orElseThrow(()->new RuntimeException("Chat not found"));
    }

    @Transactional
    public String deleteThread(String threadId){

        Optional<Thread>thread= threadRepo.findByThreadId(threadId);

        if(thread.isPresent()){
            threadRepo.deleteByThreadId(threadId); 
            return "Thread Deleted";
        }else{
            throw new RuntimeException("Thread does not exist with ID: " + threadId);
        }

    }

}
