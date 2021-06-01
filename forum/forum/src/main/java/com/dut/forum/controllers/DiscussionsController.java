package com.dut.forum.controllers;

import com.dut.forum.dto.Discussion.DiscussionDto;
import com.dut.forum.dto.Discussion.NewDiscussionData;
import com.dut.forum.dto.Discussion.SavedDiscussionData;
import com.dut.forum.dto.Discussion.UpdateDiscussionData;
import com.dut.forum.services.interfaces.IDiscussionsService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("discussions")
@AllArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000"})
public class DiscussionsController {
    private final IDiscussionsService discussionsService;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<DiscussionDto> getDiscussions(){
        return discussionsService.getAll();
    }

    @GetMapping("{id}")
    @ResponseStatus(HttpStatus.OK)
    public DiscussionDto getDiscussion(@PathVariable long id){
        return discussionsService.getById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public DiscussionDto createDiscussion(@RequestBody NewDiscussionData data, Principal principal){
        return discussionsService.createDiscussion(data, principal);
    }

    @GetMapping("topic/{id}")
    @ResponseStatus(HttpStatus.OK)
    public List<DiscussionDto> getDiscussionsByTopic(@PathVariable long id){
        return discussionsService.getByTopicId(id);
    }

    @GetMapping("user/{id}")
    @ResponseStatus(HttpStatus.OK)
    public List<DiscussionDto> getDiscussionsByUser(@PathVariable String id, Principal principal){
        return discussionsService.getByUserId(id, principal);
    }

    @GetMapping("user/{id}/saved")
    @ResponseStatus(HttpStatus.OK)
    public List<DiscussionDto> getSavedDiscussionsByUser(@PathVariable String id, Principal principal){
        return discussionsService.getSavedByUserId(id, principal);
    }

    @PostMapping("save")
    @ResponseStatus(HttpStatus.OK)
    public boolean saveDiscussion(@RequestBody SavedDiscussionData data, Principal principal){
        return discussionsService.saveDiscussion(data, principal);
    }

    @PostMapping("is-saved")
    @ResponseStatus(HttpStatus.OK)
    public boolean checkIfSaved(@RequestBody SavedDiscussionData data, Principal principal){
        return discussionsService.isSaved(data, principal);
    }

    @DeleteMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteDiscussion(@PathVariable long id, Principal principal){
        discussionsService.remove(id, principal);
    }

    @PutMapping
    @ResponseStatus(HttpStatus.OK)
    public DiscussionDto updateDiscussion(@RequestBody UpdateDiscussionData data, Principal principal){
        return discussionsService.updateDiscussion(data, principal);
    }

    @GetMapping("popular/{amount}")
    @ResponseStatus(HttpStatus.OK)
    public List<DiscussionDto> getPopular(@PathVariable int amount){
        return discussionsService.getMostPopular(amount);
    }
}
