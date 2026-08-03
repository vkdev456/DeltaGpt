package com.deltapgt.backend.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.*;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import com.deltapgt.backend.service.ChatService;
import com.deltapgt.backend.service.OpenAiService;
import com.deltapgt.backend.service.ThreadService;
import com.deltapgt.backend.dto.ChatRequestDto;


@RestController
public class ChatController {

    @Autowired
    OpenAiService openAiService;

    @Autowired
    ThreadService threadService;

    @Autowired
    ChatService chatService;

    @GetMapping("/api/chat")
    public String chat(@RequestParam String message){
        return openAiService.chat(message);
    }

    @PostMapping("/chat")
    public ResponseEntity<?> newchat(@RequestBody ChatRequestDto chat){
        String response=chatService.Chat(chat);
        return ResponseEntity.status(HttpStatus.OK).body(Map.of("reply",response));
    }
    
}
