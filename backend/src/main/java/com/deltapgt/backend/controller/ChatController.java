package com.deltapgt.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.deltapgt.backend.service.OpenAiService;

@RestController
public class ChatController {

    @Autowired
    OpenAiService openAiService;

    @GetMapping("/api/chat")
    public String chat(@RequestParam String message){
        return openAiService.chat(message);
    }
    
}
