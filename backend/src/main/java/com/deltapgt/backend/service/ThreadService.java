package com.deltapgt.backend.service;

import java.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;

import com.deltapgt.backend.dto.ThreadResponseDto;
import com.deltapgt.backend.entity.Thread;
import com.deltapgt.backend.entity.User;

import org.springframework.stereotype.Service;
import com.deltapgt.backend.repository.ThreadRepository;
import com.deltapgt.backend.repository.UserRepositorty;

import jakarta.transaction.Transactional;

@Service
public class ThreadService {

    @Autowired
    ThreadRepository threadRepo;

    @Autowired
    UserRepositorty userRepo;

    public List<ThreadResponseDto> getAllThreads(String username) {

        User user = userRepo.getByUsername(username);

        if (user == null) {
            throw new RuntimeException("User not found");
        }

        return threadRepo.findByUser(
                user,
                Sort.by(Sort.Direction.DESC, "updatedAt"))
                .stream()
                .map(thread -> new ThreadResponseDto(
                        thread.getThreadId(),
                        thread.getTitle()))
                .toList();
    }

    public Thread getThread(String threadId, String username) {

        Thread thread = threadRepo.findByThreadId(threadId)
                .orElseThrow(() -> new RuntimeException("Chat not found"));
        if (!thread.getUser().getUsername().equals(username)) {
            throw new RuntimeException("Unauthorized access");
        }
        return thread;
    }

    @Transactional
    public String deleteThread(String threadId, String username) {

        Thread thread = threadRepo.findByThreadId(threadId)
                .orElseThrow(() -> new RuntimeException("Thread does not exist"));

        if (!thread.getUser().getUsername().equals(username)) {
            throw new RuntimeException("Unauthorized access");
        }

        threadRepo.delete(thread);
        return "Thread Deleted";
    }

}
