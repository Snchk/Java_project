package com.dut.forum.dao.repos;

import com.dut.forum.dao.domain.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface RolesRepository extends JpaRepository<Role, Long> {
    @Query(value = "SELECT * FROM roles WHERE name = :role", nativeQuery = true)
    Optional<Role> findByName(@Param("role") String role);
}

