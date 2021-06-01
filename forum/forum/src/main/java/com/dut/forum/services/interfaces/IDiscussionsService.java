package com.dut.forum.services.interfaces;

import com.dut.forum.dto.Discussion.DiscussionDto;
import com.dut.forum.dto.Discussion.NewDiscussionData;
import com.dut.forum.dto.Discussion.SavedDiscussionData;
import com.dut.forum.dto.Discussion.UpdateDiscussionData;
import org.springframework.security.access.prepost.PreAuthorize;

import java.security.Principal;
import java.util.List;

public interface IDiscussionsService {
    DiscussionDto getById(long id);
    List<DiscussionDto> getByTopicId(long id);
    List<DiscussionDto> getByUserId(String id, Principal principal);
    List<DiscussionDto> getSavedByUserId(String id, Principal principal);
    List<DiscussionDto> getAll();

    DiscussionDto createDiscussion(NewDiscussionData data, Principal principal);

    boolean saveDiscussion(SavedDiscussionData data, Principal principal);

    void remove(long id, Principal principal);

    DiscussionDto updateDiscussion(UpdateDiscussionData data, Principal principal);

    boolean isSaved(SavedDiscussionData data, Principal principal);

    List<DiscussionDto> getMostPopular(int amount);
}
