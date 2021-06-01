package com.dut.forum.services.mappers;

import com.dut.forum.dao.domain.Comment;
import com.dut.forum.dao.domain.Discussion;
import com.dut.forum.dao.domain.User;
import com.dut.forum.dto.Comment.CommentDto;
import com.dut.forum.dto.Comment.NewCommentData;

import java.time.LocalDateTime;

public class CommentMapper {

    public static Comment fromDataToComment(NewCommentData data, User author, Discussion discussion){
        Comment comment = new Comment();

        comment.setCreationDate(LocalDateTime.now());
        comment.setText(data.getText());

        comment.setAuthor(author);
        comment.setDiscussion(discussion);

        return comment;
    }

    public static CommentDto fromCommentToDto(Comment comment){
        CommentDto commentDto = new CommentDto();

        commentDto.setId(comment.getId());
        commentDto.setAuthorId(comment.getAuthor().getId().toString());
        commentDto.setDiscussionId(comment.getDiscussion().getId());
        commentDto.setCreationDate(comment.getCreationDate());
        commentDto.setText(comment.getText());

        commentDto.setAuthorFirstName(comment.getAuthor().getFirstName());
        commentDto.setAuthorLastName(comment.getAuthor().getLastName());
        commentDto.setDiscussionTitle(comment.getDiscussion().getTitle());

        return commentDto;
    }
}
