package com.dut.forum.dao.repos;

import com.dut.forum.dao.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import java.util.UUID;

public interface UsersRepository extends JpaRepository<User, UUID> {
    @Query(value = "SELECT DISTINCT * FROM users WHERE email = :email", nativeQuery = true)
    Optional<User> findByEmail(@Param("email") String email);
}
