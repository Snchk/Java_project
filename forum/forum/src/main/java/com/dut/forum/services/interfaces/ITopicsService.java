package com.dut.forum.services.interfaces;

import com.dut.forum.dto.Topic.TopicDto;
import com.dut.forum.dto.Topic.UpdateTopicData;

import java.util.List;

public interface ITopicsService {
    List<TopicDto> getAll();

    TopicDto create(String name);

    void remove(long id);

    TopicDto updateTopic(UpdateTopicData data);

    TopicDto getById(long id);
}
