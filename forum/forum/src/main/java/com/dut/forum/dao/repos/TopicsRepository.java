package com.dut.forum.dao.repos;

import com.dut.forum.dao.domain.Topic;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TopicsRepository extends JpaRepository<Topic, Long> {
    Optional<Topic> findByName(String name);
}
