package com.deltapgt.backend.dto;

public class ThreadResponseDto {

    private String threadId;
    private String title;

    public ThreadResponseDto(String threadId, String title) {
        this.threadId = threadId;
        this.title = title;
    }

    public String getThreadId() {
        return threadId;
    }

    public String getTitle() {
        return title;
    }
}
