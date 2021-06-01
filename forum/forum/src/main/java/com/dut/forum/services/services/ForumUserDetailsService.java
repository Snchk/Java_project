package com.dut.forum.services.services;

import com.dut.forum.dao.domain.User;
import com.dut.forum.dao.repos.UsersRepository;
import com.dut.forum.dto.User.ForumUserDetails;
import com.dut.forum.exceptions.ItemNotFoundException;
import com.dut.forum.services.mappers.UserMapper;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class ForumUserDetailsService implements UserDetailsService {
    private final UsersRepository usersRepository;

    @Override
    public ForumUserDetails loadUserByUsername(String username) {
        User user = usersRepository.findByEmail(username)
                .orElseThrow(() -> new ItemNotFoundException("User not found"));

        return UserMapper.fromUserToForumUserDetails(user);
    }
}
