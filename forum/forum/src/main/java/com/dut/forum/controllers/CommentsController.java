package com.dut.forum.controllers;

import com.dut.forum.dto.Comment.CommentDto;
import com.dut.forum.dto.Comment.NewCommentData;
import com.dut.forum.dto.Comment.UpdateCommentData;
import com.dut.forum.services.interfaces.ICommentsService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("comments")
@AllArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000"})
public class CommentsController {
    private final ICommentsService commentsService;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<CommentDto> getAll(){
        return commentsService.getAll();
    }

    @GetMapping("user/{id}")
    @ResponseStatus(HttpStatus.OK)
    public List<CommentDto> getByUser(@PathVariable String id, Principal principal){
        return commentsService.getByUserId(id, principal);
    }

    @GetMapping("discussion/{id}")
    @ResponseStatus(HttpStatus.OK)
    public List<CommentDto> getByDiscussion(@PathVariable long id){
        return commentsService.getByDiscussionId(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public CommentDto createComment(@RequestBody NewCommentData data, Principal principal){
        return commentsService.createComment(data, principal);
    }

    @PutMapping
    @ResponseStatus(HttpStatus.OK)
    public CommentDto updateComment(@RequestBody UpdateCommentData data, Principal principal){
        return commentsService.updateComment(data, principal);
    }

    @DeleteMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteComment(@PathVariable long id, Principal principal){
        commentsService.deleteComment(id, principal);
    }
}
