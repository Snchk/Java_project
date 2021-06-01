package com.dut.forum.services.mappers;

import com.dut.forum.dao.domain.Topic;
import com.dut.forum.dto.Topic.TopicDto;

public class TopicMapper {
    public static TopicDto fromTopicToDto(Topic topic){
        return new TopicDto(topic.getId(), topic.getName());
    }
}
