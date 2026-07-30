package com.deltapgt.backend.service;

import java.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

@Service
public class OpenAiService {

    
    private final RestClient restClient;

    public OpenAiService(RestClient restClient){
        this.restClient=restClient;
    }


    @Value("${openai.api.key}")
    private String apikey;

    public String chat(String message){
          
        Map<String,Object>body=Map.of(
            "model","gpt-40-mini",
            "messages",List.of(
                Map.of(
                    "role","user",
                     "content",message
                )
            )
        );

        String uri="https://api.openai.com/v1/chat/completions";

        String response=restClient.post()
                        .uri(uri)
                        .header("Authorization","Bearer "+apikey)
                        .header("Content-Type","Application/json")
                        .body(body)
                        .retrieve()
                        .body(String.class);


        return response;                

    }
    
}
