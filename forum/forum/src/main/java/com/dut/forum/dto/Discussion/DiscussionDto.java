package com.dut.forum.dto.Discussion;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class DiscussionDto {
    private long id;
    private long topicId;
    private String topicName;
    private String authorId;
    private String authorFirstName;
    private String authorLastName;
    private String title;
    private String text;
    private LocalDateTime creationDate;
}
