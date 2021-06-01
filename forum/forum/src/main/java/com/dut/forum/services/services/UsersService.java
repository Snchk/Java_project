package com.dut.forum.services.services;

import com.dut.forum.dao.domain.JwtBlacklist;
import com.dut.forum.dao.domain.Role;
import com.dut.forum.dao.domain.User;
import com.dut.forum.dao.repos.JwtBlacklistRepository;
import com.dut.forum.dao.repos.RolesRepository;
import com.dut.forum.dao.repos.UsersRepository;
import com.dut.forum.dto.User.AuthenticationData;
import com.dut.forum.dto.User.UserDto;
import com.dut.forum.dto.User.UserLoginData;
import com.dut.forum.dto.User.UserRegisterData;
import com.dut.forum.exceptions.*;
import com.dut.forum.security.JwtTokenUtil;
import com.dut.forum.services.interfaces.IUsersService;
import com.dut.forum.services.mappers.UserMapper;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

@Service
@AllArgsConstructor
public class UsersService implements IUsersService {
    private final UsersRepository usersRepository;
    private final RolesRepository rolesRepository;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenUtil jwtTokenUtil;
    private final JwtBlacklistRepository jwtBlacklistRepository;

    @Override
    public AuthenticationData register(UserRegisterData data) {
        if (data.getFirstName() == null || data.getFirstName().length() < 3)
            throw new DataNotProvidedException("First name must have at least 3 characters!");

        if (data.getLastName() == null || data.getLastName().length() < 3)
            throw new DataNotProvidedException("Last name must have at least 3 characters!");

        if (data.getEmail() == null || !data.getEmail().matches("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$"))
            throw new DataNotProvidedException("Bad email");

        if (data.getPassword() == null || data.getPassword().length() < 6)
            throw new DataNotProvidedException("Password must have at least 6 characters!");

        if (usersRepository.findByEmail(data.getEmail()).isPresent())
            throw new WrongDataException("Email is already used!");

        Set<Role> roles = new HashSet<>();
        Optional<Role> roleUser = rolesRepository.findByName("ROLE_USER");

        if (roleUser.isEmpty()) {
            roles = seedRoles();
        } else {
            roles.add(roleUser.get());
        }

        User userDb = UserMapper.fromRegisterToUser(data);
        userDb.setRoles(roles);

        usersRepository.save(userDb);

        return login(new UserLoginData(data.getEmail(), data.getPassword()));
    }

    @Override
    public AuthenticationData login(UserLoginData data) {
        if (data.getEmail() == null || !data.getEmail().matches("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$"))
            throw new DataNotProvidedException("Bad email");

        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(data.getEmail(), data.getPassword()));
        } catch (DisabledException e) {
            throw new NotAccessibleException("User is blocked", e);
        } catch (BadCredentialsException e) {
            throw new WrongDataException("Invalid credentials", e);
        }

        User userDb = usersRepository.findByEmail(data.getEmail())
                .orElseThrow(() -> new ItemNotFoundException("User not found!"));

        final String token = jwtTokenUtil.generateToken(UserMapper.fromUserToForumUserDetails(userDb));

        return new AuthenticationData(userDb.getId().toString(), token);
    }

    @Override
    public void logout(AuthenticationData data) {
        UUID uuid;
        try {
            uuid = UUID.fromString(data.getId());
        } catch (Exception ex) {
            throw new WrongDataException("Invalid user ID");
        }

        User userDb = usersRepository.findById(uuid)
                .orElseThrow(() -> new ItemNotFoundException("Such user does not exist!"));

        if (!jwtTokenUtil.getEmailFromToken(data.getToken()).equals(userDb.getEmail()))
            throw new ForbiddenException("Token and ID is not corresponded");

        jwtBlacklistRepository.findByToken(data.getToken()).ifPresent((val) -> {
            throw new NotAccessibleException("This token is already logged out");
        });

        jwtBlacklistRepository.save(new JwtBlacklist(data.getToken()));
    }

    @Override
    public UserDto getById(String id) {
        UUID uuid;
        try {
            uuid = UUID.fromString(id);
        } catch (Exception ex) {
            throw new WrongDataException("Invalid user ID");
        }

        return UserMapper.fromUserToDto(
                usersRepository.findById(uuid)
                        .orElseThrow(() -> new ItemNotFoundException("User not found"))
        );
    }

    private Set<Role> seedRoles() {
        Set<Role> roles = new HashSet<>();

        roles.add(new Role(1L, "ROLE_ADMIN"));
        roles.add(new Role(2L, "ROLE_USER"));

        return new HashSet<>(rolesRepository.saveAll(roles));
    }
}
