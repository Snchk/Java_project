package com.dut.forum.services.services;

import com.dut.forum.dao.domain.Discussion;
import com.dut.forum.dao.domain.Topic;
import com.dut.forum.dao.domain.User;
import com.dut.forum.dao.repos.DiscussionsRepository;
import com.dut.forum.dao.repos.RolesRepository;
import com.dut.forum.dao.repos.TopicsRepository;
import com.dut.forum.dao.repos.UsersRepository;
import com.dut.forum.dto.Discussion.DiscussionDto;
import com.dut.forum.dto.Discussion.NewDiscussionData;
import com.dut.forum.dto.Discussion.SavedDiscussionData;
import com.dut.forum.dto.Discussion.UpdateDiscussionData;
import com.dut.forum.exceptions.DataNotProvidedException;
import com.dut.forum.exceptions.ForbiddenException;
import com.dut.forum.exceptions.ItemNotFoundException;
import com.dut.forum.exceptions.WrongDataException;
import com.dut.forum.services.interfaces.IDiscussionsService;
import com.dut.forum.services.mappers.DiscussionMapper;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class DiscussionsService implements IDiscussionsService {

    private final DiscussionsRepository discussionsRepository;
    private final TopicsRepository topicsRepository;
    private final UsersRepository usersRepository;
    private final RolesRepository rolesRepository;

    @Override
    public DiscussionDto getById(long id) {
        return DiscussionMapper.fromDiscussionToDto(
                discussionsRepository.findById(id).orElseThrow(
                        () -> new ItemNotFoundException("Discussion not found!")
                ));
    }

    @Override
    public List<DiscussionDto> getByTopicId(long id) {
        Topic topicDb = topicsRepository.findById(id)
                .orElseThrow(() -> new ItemNotFoundException("Such topic does not exist!"));

        return discussionsRepository.findByTopic(topicDb)
                .stream()
                .map(DiscussionMapper::fromDiscussionToDto)
                .sorted((e1, e2) -> e1.getId() > e2.getId() ? 1 : -1)
                .collect(Collectors.toList());
    }

    @Override
    public List<DiscussionDto> getByUserId(String id, Principal principal) {
        UUID uuid;
        try {
            uuid = UUID.fromString(id);
        } catch (Exception ex) {
            throw new WrongDataException("Invalid user ID");
        }

        User userDb = usersRepository.findById(uuid)
                .orElseThrow(() -> new ItemNotFoundException("Such user does not exist!"));

        if (!userDb.getEmail().equals(principal.getName()))
            throw new ForbiddenException("You are not allowed to get this data");

        return discussionsRepository.findByAuthor(userDb)
                .stream()
                .map(DiscussionMapper::fromDiscussionToDto)
                .sorted((e1, e2) -> e1.getId() > e2.getId() ? 1 : -1)
                .collect(Collectors.toList());
    }

    @Override
    public List<DiscussionDto> getSavedByUserId(String id, Principal principal) {
        UUID uuid;
        try {
            uuid = UUID.fromString(id);
        } catch (Exception ex) {
            throw new WrongDataException("Invalid user ID");
        }

        User userDb = usersRepository.findById(uuid)
                .orElseThrow(() -> new ItemNotFoundException("Such user does not exist!"));

        if (!userDb.getEmail().equals(principal.getName()))
            throw new ForbiddenException("You are not allowed to get this data");

        return userDb.getSavedDiscussions()
                .stream()
                .map(DiscussionMapper::fromDiscussionToDto)
                .sorted((e1, e2) -> e1.getId() > e2.getId() ? 1 : -1)
                .collect(Collectors.toList());
    }

    @Override
    public List<DiscussionDto> getAll() {
        return discussionsRepository.findAll()
                .stream()
                .map(DiscussionMapper::fromDiscussionToDto)
                .collect(Collectors.toList());
    }

    @Override
    public DiscussionDto createDiscussion(NewDiscussionData data, Principal principal) {
        UUID uuid;
        try {
            uuid = UUID.fromString(data.getAuthorId());
        } catch (Exception ex) {
            throw new WrongDataException("Invalid user ID");
        }

        User userDb = usersRepository.findById(uuid)
                .orElseThrow(() -> new ItemNotFoundException("Such user does not exist!"));

        if (!userDb.getEmail().equals(principal.getName()))
            throw new ForbiddenException("You are not allowed to create discussions for others");

        Topic topicDb = topicsRepository.findById(data.getTopicId())
                .orElseThrow(() -> new ItemNotFoundException("Such topic does not exist!"));

        if (data.getTitle() == null || data.getTitle().length() < 5)
            throw new DataNotProvidedException("Title must have at least 5 characters!");

        if (data.getText() == null || data.getText().length() < 20)
            throw new DataNotProvidedException("Discussion body must contain at least 20 characters!");

        return DiscussionMapper.fromDiscussionToDto(
                discussionsRepository.save(
                        DiscussionMapper.fromDataToDiscussion(data, userDb, topicDb)
                ));
    }

    @Override
    public boolean saveDiscussion(SavedDiscussionData data, Principal principal) {
        UUID uuid;
        try {
            uuid = UUID.fromString(data.getUserId());
        } catch (Exception ex) {
            throw new WrongDataException("Invalid user ID");
        }

        User userDb = usersRepository.findById(uuid)
                .orElseThrow(() -> new ItemNotFoundException("Such user does not exist!"));

        if (!userDb.getEmail().equals(principal.getName()))
            throw new ForbiddenException("You are not allowed to get this data");

        Discussion discussionDb = discussionsRepository.findById(data.getDiscussionId())
                .orElseThrow(() -> new ItemNotFoundException("Such discussion does not exist!"));

        boolean contains = userDb.getSavedDiscussions().contains(discussionDb);

        if (contains)
            userDb.getSavedDiscussions().remove(discussionDb);
        else
            userDb.getSavedDiscussions().add(discussionDb);

        usersRepository.save(userDb);

        return !contains;
    }

    @Override
    public void remove(long id, Principal principal) {
        Discussion discussionDb = discussionsRepository.findById(id)
                .orElseThrow(() -> new ItemNotFoundException("Such discussion does not exist!"));

        User userDb = usersRepository.findById(discussionDb.getAuthor().getId())
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

        discussionsRepository.delete(discussionDb);
    }

    @Override
    public DiscussionDto updateDiscussion(UpdateDiscussionData data, Principal principal) {
        Discussion discussionDb = discussionsRepository.findById(data.getId())
                .orElseThrow(() -> new ItemNotFoundException("Such discussion does not exist!"));

        if (!discussionDb.getAuthor().getEmail().equals(principal.getName()))
            throw new ForbiddenException("You are not allowed to update comments of other's");

        Topic topicDb = topicsRepository.findById(discussionDb.getTopic().getId())
                .orElseThrow(() -> new ItemNotFoundException("Such topic does not exist!"));

        if (data.getTitle() == null || data.getTitle().length() < 5)
            throw new DataNotProvidedException("Title must have at least 5 characters!");

        if (data.getText() == null || data.getText().length() < 20)
            throw new DataNotProvidedException("Discussion body must contain at least 20 characters!");

        discussionDb.setTitle(data.getTitle());
        discussionDb.setText(data.getText());
        discussionDb.setTopic(topicDb);

        return DiscussionMapper.fromDiscussionToDto(discussionsRepository.save(discussionDb));
    }

    @Override
    public boolean isSaved(SavedDiscussionData data, Principal principal) {
        UUID uuid;
        try {
            uuid = UUID.fromString(data.getUserId());
        } catch (Exception ex) {
            throw new WrongDataException("Invalid user ID");
        }

        User userDb = usersRepository.findById(uuid)
                .orElseThrow(() -> new ItemNotFoundException("Such user does not exist!"));

        if (!userDb.getEmail().equals(principal.getName()))
            throw new ForbiddenException("You are not allowed to get this data");

        return userDb.getSavedDiscussions()
                .contains(
                        discussionsRepository.findById(data.getDiscussionId())
                                .orElseThrow(() -> new ItemNotFoundException("Discussion not found!"))
                );
    }

    @Override
    public List<DiscussionDto> getMostPopular(int amount) {
        if (amount < 1)
            throw new WrongDataException("Amount can not be less than 1!");

        return discussionsRepository.findPopular(amount)
                .stream()
                .map(DiscussionMapper::fromDiscussionToDto)
                .collect(Collectors.toList());
    }


}
