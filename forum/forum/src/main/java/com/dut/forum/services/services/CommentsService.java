package com.dut.forum.services.services;

import com.dut.forum.dao.domain.Comment;
import com.dut.forum.dao.domain.Discussion;
import com.dut.forum.dao.domain.Role;
import com.dut.forum.dao.domain.User;
import com.dut.forum.dao.repos.CommentsRepository;
import com.dut.forum.dao.repos.DiscussionsRepository;
import com.dut.forum.dao.repos.RolesRepository;
import com.dut.forum.dao.repos.UsersRepository;
import com.dut.forum.dto.Comment.CommentDto;
import com.dut.forum.dto.Comment.NewCommentData;
import com.dut.forum.dto.Comment.UpdateCommentData;
import com.dut.forum.dto.User.ForumUserDetails;
import com.dut.forum.exceptions.DataNotProvidedException;
import com.dut.forum.exceptions.ForbiddenException;
import com.dut.forum.exceptions.ItemNotFoundException;
import com.dut.forum.exceptions.WrongDataException;
import com.dut.forum.services.interfaces.ICommentsService;
import com.dut.forum.services.mappers.CommentMapper;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class CommentsService implements ICommentsService {
    private final DiscussionsRepository discussionsRepository;
    private final CommentsRepository commentsRepository;
    private final UsersRepository usersRepository;
    private final RolesRepository rolesRepository;

    @Override
    public List<CommentDto> getAll() {
        return commentsRepository.findAll()
                .stream()
                .map(CommentMapper::fromCommentToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<CommentDto> getByUserId(String id, Principal principal) {
        UUID uuid;
        try{
            uuid = UUID.fromString(id);
        }
        catch (Exception ex) {
            throw new WrongDataException("Invalid user ID");
        }

        User userDb = usersRepository.findById(uuid)
                .orElseThrow(() -> new ItemNotFoundException("Such user does not exist!"));

        if (!userDb.getEmail().equals(principal.getName()))
            throw new ForbiddenException("You are not allowed to get this data");


        return commentsRepository.findByAuthor(userDb)
                .stream()
                .map(CommentMapper::fromCommentToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<CommentDto> getByDiscussionId(long id) {
        Discussion discussionDb = discussionsRepository.findById(id)
                .orElseThrow(() -> new ItemNotFoundException("Such discussion does not exist!"));

        return commentsRepository.findByDiscussion(discussionDb)
                .stream()
                .map(CommentMapper::fromCommentToDto)
                .collect(Collectors.toList());
    }

    @Override
    public CommentDto createComment(NewCommentData data, Principal principal) {
        UUID uuid;
        try{
            uuid = UUID.fromString(data.getAuthorId());
        }
        catch (Exception ex) {
            throw new WrongDataException("Invalid user ID");
        }

        User userDb = usersRepository.findById(uuid)
                .orElseThrow(() -> new ItemNotFoundException("Such user does not exist!"));

        if (!userDb.getEmail().equals(principal.getName()))
            throw new ForbiddenException("You are not allowed to create comments for other users");

        Discussion discussionDb = discussionsRepository.findById(data.getDiscussionId())
                .orElseThrow(() -> new ItemNotFoundException("Such discussion does not exist!"));

        if (data.getText() == null || data.getText().length() < 5)
            throw new DataNotProvidedException("Text must contain at least 5 characters!");

        return CommentMapper.fromCommentToDto(
                commentsRepository.save(
                        CommentMapper.fromDataToComment(data, userDb, discussionDb)
                ));
    }

    @Override
    public CommentDto updateComment(UpdateCommentData data, Principal principal) {
        Comment commentDb = commentsRepository.findById(data.getId())
                .orElseThrow(() -> new ItemNotFoundException("Such comment does not exist!"));

        if (!commentDb.getAuthor().getEmail().equals(principal.getName()))
            throw new ForbiddenException("You are not allowed to update comments of other's");

        if (data.getText() == null || data.getText().length() < 5)
            throw new DataNotProvidedException("Text must have at least 5 characters!");

        commentDb.setText(data.getText());

        return CommentMapper.fromCommentToDto(commentsRepository.save(commentDb));
    }

    @Override
    public void deleteComment(long id, Principal principal) {
        Comment commentDb = commentsRepository.findById(id)
                .orElseThrow(() -> new ItemNotFoundException("Such comment does not exist!"));

        User userDb = usersRepository.findById(commentDb.getAuthor().getId())
                .orElseThrow(() -> new ItemNotFoundException("Such user does not exist!"));

        if (!userDb.getEmail().equals(principal.getName()))
            if (!usersRepository.findByEmail(principal.getName())
                    .orElseThrow(() -> new ItemNotFoundException("User not found!"))
                    .getRoles()
                    .contains(
                            rolesRepository.findByName("ROLE_ADMIN").get()
                    )
            )
                throw new ForbiddenException("You are not allowed to delete this comment");

        commentsRepository.delete(commentDb);
    }
}
