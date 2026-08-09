package com.deltapgt.backend.service;

import java.util.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class OpenAiService {

    private RestClient restClient;

    public OpenAiService(RestClient restClient){
        this.restClient=restClient;
    }

    @Value("${openai.api.key}")
    private  String apikey;

    public  String chat(String message){
          
        Map<String,Object>body=Map.of(
            "model","gpt-4o-mini",
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
                        .header("Content-Type","application/json")
                        .body(body)
                        .retrieve()
                        .body(String.class);

            try {
        ObjectMapper mapper = new ObjectMapper();

        JsonNode root = mapper.readTree(response);

        return root
                .get("choices")
                .get(0)
                .get("message")
                .get("content")
                .asText();

    } catch (Exception e) {
        throw new RuntimeException("Failed to parse OpenAI response", e);
    }

    }
    
}
