package com.dut.forum.dto.Discussion;

import lombok.Data;

@Data
public class NewDiscussionData {
    private long topicId;
    private String authorId;
    private String title;
    private String text;
}
