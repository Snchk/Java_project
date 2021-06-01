package com.dut.forum.dao.repos;

import com.dut.forum.dao.domain.JwtBlacklist;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface JwtBlacklistRepository  extends JpaRepository<JwtBlacklist, Long> {
    Optional<JwtBlacklist> findByToken(String token);
}
