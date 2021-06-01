package com.dut.forum.services.interfaces;

import com.dut.forum.dto.Comment.CommentDto;
import com.dut.forum.dto.Comment.NewCommentData;
import com.dut.forum.dto.Comment.UpdateCommentData;

import java.security.Principal;
import java.util.List;

public interface ICommentsService {

    List<CommentDto> getAll();

    List<CommentDto> getByUserId(String id, Principal principal);

    List<CommentDto> getByDiscussionId(long id);

    CommentDto createComment(NewCommentData data, Principal principal);

    CommentDto updateComment(UpdateCommentData data, Principal principal);

    void deleteComment(long id, Principal principal);
}
