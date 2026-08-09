package com.deltapgt.backend.controller;

import java.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.deltapgt.backend.dto.ThreadResponseDto;
import com.deltapgt.backend.entity.Thread;
import com.deltapgt.backend.service.*;

import com.deltapgt.backend.repository.ThreadRepository;

@RestController
public class ThreadController{

    @Autowired
    ThreadRepository threadRepo;

    @Autowired
    ThreadService threadService;

    @GetMapping("/threads")
    public ResponseEntity<?> getAllThreads(){

        List<ThreadResponseDto>response=threadService.getAllThreads();
        return ResponseEntity.status(HttpStatus.OK).body(response);

    }

    @GetMapping("/thread/{threadId}")
    public ResponseEntity<?> getThread(@PathVariable String threadId){

        Thread thread=threadService.getThread(threadId);

        return ResponseEntity.status(HttpStatus.OK).body(thread);
    }

    @DeleteMapping("/thread/{threadId}")
    public ResponseEntity<?> deleteThread(@PathVariable String threadId){
           
        String reponse=threadService.deleteThread(threadId);

        return ResponseEntity.status(HttpStatus.OK).body(Map.of("success","Chat deleted successfully"));

    }

    @PostMapping("api/test")
    public Thread test(){
        
        Thread thread=new Thread();

        thread.setThreadId("xyz12346");
        thread.setTitle("Testing new Thread");

        return threadRepo.save(thread);
        
    }


}
