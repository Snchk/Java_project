package com.dut.forum.dto.Discussion;

import lombok.Data;

@Data
public class UpdateDiscussionData {
    private long id;
    private String title;
    private String text;
}
