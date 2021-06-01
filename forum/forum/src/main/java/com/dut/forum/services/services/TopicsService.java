package com.dut.forum.services.services;

import com.dut.forum.dao.domain.Topic;
import com.dut.forum.dao.repos.TopicsRepository;
import com.dut.forum.dto.Topic.TopicDto;
import com.dut.forum.dto.Topic.UpdateTopicData;
import com.dut.forum.exceptions.DataNotProvidedException;
import com.dut.forum.exceptions.ItemNotFoundException;
import com.dut.forum.exceptions.WrongDataException;
import com.dut.forum.services.interfaces.ITopicsService;
import com.dut.forum.services.mappers.TopicMapper;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class TopicsService implements ITopicsService {
    private final TopicsRepository topicsRepository;

    @Override
    public List<TopicDto> getAll() {
        return topicsRepository.findAll()
                .stream()
                .map(TopicMapper::fromTopicToDto)
                .collect(Collectors.toList());
    }

    @Override
    public TopicDto create(String name) {
        if (name.isBlank() || name.length() < 3)
            throw new DataNotProvidedException("Topic name must contain at least 3 characters!");

        topicsRepository.findByName(name).ifPresent((val) -> {
            throw new WrongDataException("Topic with such name already exists!");
        });

        return TopicMapper.fromTopicToDto(topicsRepository.save(new Topic(name)));
    }

    @Override
    public void remove(long id) {
        topicsRepository.delete(
                topicsRepository.findById(id)
                        .orElseThrow(() -> new ItemNotFoundException("Such topic does not exist!"))
        );
    }

    @Override
    public TopicDto updateTopic(UpdateTopicData data) {
        if (data.getName().isBlank() || data.getName().length() < 3)
            throw new DataNotProvidedException("Topic name must contain at least 3 characters!");

        Topic topicDb = topicsRepository.findById(data.getId())
                .orElseThrow(() -> new ItemNotFoundException("Such topic does not exist!"));

        topicsRepository.findByName(data.getName()).ifPresent((val) -> {
            throw new WrongDataException("Topic with such name already exists!");
        });

        topicDb.setName(data.getName());

        return TopicMapper.fromTopicToDto(topicsRepository.save(topicDb));
    }

    @Override
    public TopicDto getById(long id) {
        return TopicMapper.fromTopicToDto(
                topicsRepository.findById(id)
                        .orElseThrow(() -> new ItemNotFoundException("Such topic does not exist!"))
        );
    }
}
