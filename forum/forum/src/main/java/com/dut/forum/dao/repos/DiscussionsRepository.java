package com.dut.forum.dao.repos;

import com.dut.forum.dao.domain.Discussion;
import com.dut.forum.dao.domain.Topic;
import com.dut.forum.dao.domain.User;
import com.dut.forum.dto.Discussion.DiscussionDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Arrays;
import java.util.List;

public interface DiscussionsRepository extends JpaRepository<Discussion, Long> {
    List<Discussion> findByAuthor(User author);

    List<Discussion> findByTopic(Topic topic);

    @Query(value = "SELECT *\n" +
            "FROM discussions d\n" +
            "JOIN comments c ON c.discussion_id = d.id\n" +
            "GROUP BY d.id\n" +
            "HAVING COUNT(c.id) > 0\n" +
            "ORDER BY COUNT(c.id) desc\n" +
            "LIMIT 5",
            nativeQuery = true)
    List<Discussion> findPopular(@Param("amount") int amount);
}
