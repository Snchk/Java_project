package com.dut.forum.services.mappers;

import com.dut.forum.dao.domain.Discussion;
import com.dut.forum.dao.domain.Topic;
import com.dut.forum.dao.domain.User;
import com.dut.forum.dto.Discussion.DiscussionDto;
import com.dut.forum.dto.Discussion.NewDiscussionData;

import java.time.LocalDateTime;
import java.util.HashSet;

public class DiscussionMapper {
    public static DiscussionDto fromDiscussionToDto(Discussion discussion){
        DiscussionDto discussionDto = new DiscussionDto();

        discussionDto.setId(discussion.getId());
        discussionDto.setAuthorId(discussion.getAuthor().getId().toString());
        discussionDto.setCreationDate(discussion.getCreationDate());
        discussionDto.setText(discussion.getText());
        discussionDto.setTitle(discussion.getTitle());
        discussionDto.setTopicId(discussion.getTopic().getId());


        discussionDto.setAuthorFirstName(discussion.getAuthor().getFirstName());
        discussionDto.setAuthorLastName(discussion.getAuthor().getLastName());
        discussionDto.setTopicName(discussion.getTopic().getName());

        return discussionDto;
    }

    public static Discussion fromDataToDiscussion(NewDiscussionData data, User user, Topic topic) {
        Discussion discussion = new Discussion();

        discussion.setAuthor(user);
        discussion.setTopic(topic);
        discussion.setComments(new HashSet<>());
        discussion.setTitle(data.getTitle());
        discussion.setText(data.getText());
        discussion.setCreationDate(LocalDateTime.now());

        return discussion;
    }

}
