package com.dut.forum.dao.repos;

import com.dut.forum.dao.domain.Comment;
import com.dut.forum.dao.domain.Discussion;
import com.dut.forum.dao.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentsRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByDiscussion(Discussion discussion);

    List<Comment> findByAuthor(User author);
}
