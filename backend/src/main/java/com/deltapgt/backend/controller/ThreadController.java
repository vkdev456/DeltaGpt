package com.deltapgt.backend.controller;

import java.util.*;

import org.springframework.security.core.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.deltapgt.backend.dto.ThreadResponseDto;
import com.deltapgt.backend.entity.Thread;
import com.deltapgt.backend.service.*;

import com.deltapgt.backend.repository.ThreadRepository;

@RestController
public class ThreadController {

    @Autowired
    ThreadRepository threadRepo;

    @Autowired
    ThreadService threadService;

    @GetMapping("/threads")
    public ResponseEntity<?> getAllThreads(Authentication authentication) {

        String username = authentication.getName();
        List<ThreadResponseDto> response = threadService.getAllThreads(username);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/thread/{threadId}")
    public ResponseEntity<?> getThread(@PathVariable String threadId, Authentication authentication) {

        String username = authentication.getName();
        Thread thread = threadService.getThread(threadId, username);

        return ResponseEntity.ok(thread);
    }

    @DeleteMapping("/thread/{threadId}")
    public ResponseEntity<?> deleteThread(@PathVariable String threadId, Authentication authentication) {

        String username = authentication.getName();
        threadService.deleteThread(threadId, username);

        return ResponseEntity.ok(Map.of("success", "Chat deleted successfully"));
    }

    @PostMapping("api/test")
    public Thread test() {

        Thread thread = new Thread();

        thread.setThreadId("xyz12346");
        thread.setTitle("Testing new Thread");

        return threadRepo.save(thread);

    }

}
