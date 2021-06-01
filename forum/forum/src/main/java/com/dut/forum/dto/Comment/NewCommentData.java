package com.dut.forum.dto.Comment;

import lombok.Data;

@Data
public class NewCommentData {
    private long discussionId;
    private String authorId;
    private String text;
}
