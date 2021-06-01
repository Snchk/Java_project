package com.dut.forum.dto.Comment;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CommentDto {
    private long id;
    private String discussionTitle;
    private long discussionId;
    private String authorId;
    private String authorFirstName;
    private String authorLastName;
    private LocalDateTime creationDate;
    private String text;
}
