package com.dut.forum.services.mappers;

import com.dut.forum.dao.domain.Role;
import com.dut.forum.dao.domain.User;
import com.dut.forum.dto.User.ForumUserDetails;
import com.dut.forum.dto.User.UserDto;
import com.dut.forum.dto.User.UserRegisterData;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.*;
import java.util.stream.Collectors;

public class UserMapper {
    public static User fromRegisterToUser(UserRegisterData data) {
        User user = new User();

        user.setId(UUID.nameUUIDFromBytes(data.getEmail().getBytes()));
        user.setFirstName(data.getFirstName());
        user.setLastName(data.getLastName());
        user.setEmail(data.getEmail());

        user.setPasswordHash(
                new BCryptPasswordEncoder()
                        .encode(
                                data.getPassword()
                        )
        );

        user.setRoles(new HashSet<>());
        user.setComments(new HashSet<>());
        user.setDiscussions(new HashSet<>());
        user.setSavedDiscussions(new HashSet<>());

        return user;
    }

    public static UserDto fromUserToDto(User userDb){
        UserDto userDto = new UserDto();

        userDto.setId(userDb.getId().toString());
        userDto.setEmail(userDb.getEmail());
        userDto.setFirstName(userDb.getFirstName());
        userDto.setLastName(userDb.getLastName());

        userDto.setRoles(userDb.getRoles()
                .stream()
                .map((u) -> u.getName().replace("ROLE_", ""))
                .sorted(String::compareToIgnoreCase)
                .collect(Collectors.toList()));

        return userDto;
    }

    public static ForumUserDetails fromUserToForumUserDetails(User user){
        ForumUserDetails details = new ForumUserDetails();

        details.setId(user.getId().toString());
        details.setEmail(user.getEmail());
        details.setPassword(user.getPasswordHash());

        List<SimpleGrantedAuthority> roles = new ArrayList<>();

        for (Role role :
                user.getRoles()) {
            roles.add(new SimpleGrantedAuthority(role.getName()));
        }

        details.setGrantedAuthorities(roles);

        return details;
    }
}
