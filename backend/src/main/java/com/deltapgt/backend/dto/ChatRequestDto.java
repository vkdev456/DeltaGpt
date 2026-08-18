package com.deltapgt.backend.dto;

public class ChatRequestDto {
    private String threadId;
    private String message;    

    public ChatRequestDto() {

    }

    public String getThreadId() {
        return threadId;
    }

    public void setThreadId(String threadId) {
        this.threadId = threadId;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

}
