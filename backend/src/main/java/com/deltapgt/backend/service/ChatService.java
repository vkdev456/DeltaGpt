package com.deltapgt.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.deltapgt.backend.dto.ChatRequestDto;
import com.deltapgt.backend.entity.Message;
import com.deltapgt.backend.entity.Role;
import com.deltapgt.backend.entity.Thread;
import com.deltapgt.backend.repository.MessageRepository;
import com.deltapgt.backend.repository.ThreadRepository;

import jakarta.transaction.Transactional;

@Service
public class ChatService {

    @Autowired
    private OpenAiService openAiService;

    @Autowired
    private ThreadRepository threadRepo;

    @Autowired
    private ThreadService threadService;

    @Autowired
    private MessageRepository messageRepo;


    @Transactional
    public String Chat(ChatRequestDto chat) {

   
        Thread thread = threadService.getThread(chat.getThreadId());

        if (thread == null) {

            thread = new Thread();
            thread.setThreadId(chat.getThreadId());
            thread.setTitle(chat.getMessage());

            threadRepo.save(thread);
        }

        Message userMessage = new Message();
        userMessage.setRole(Role.USER);
        userMessage.setContent(chat.getMessage());
        userMessage.setThread(thread);

        messageRepo.save(userMessage);

     
        String assistantReply = openAiService.chat(chat.getMessage());

       
        Message assistantMessage = new Message();
        assistantMessage.setRole(Role.ASSISTANT);
        assistantMessage.setContent(assistantReply);
        assistantMessage.setThread(thread);

        messageRepo.save(assistantMessage);  
        
        threadRepo.save(thread);


        return assistantReply;
    }
}