package com.dut.forum.controllers;

import com.dut.forum.dto.Topic.TopicDto;
import com.dut.forum.dto.Topic.UpdateTopicData;
import com.dut.forum.services.interfaces.ITopicsService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("topics")
@AllArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000"})
public class TopicsController {
    private final ITopicsService topicsService;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<TopicDto> getAll(){
        return topicsService.getAll();
    }

    @GetMapping("{id}")
    @ResponseStatus(HttpStatus.OK)
    public TopicDto getTopic(@PathVariable long id){
        return topicsService.getById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public TopicDto create(@RequestBody String name){
        return  topicsService.create(name);
    }

    @DeleteMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteTopic(@PathVariable long id){
        topicsService.remove(id);
    }

    @PutMapping
    @ResponseStatus(HttpStatus.OK)
    public TopicDto updateTopic(@RequestBody UpdateTopicData data){
        return topicsService.updateTopic(data);
    }
}
