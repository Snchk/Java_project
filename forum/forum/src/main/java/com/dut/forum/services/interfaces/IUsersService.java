package com.dut.forum.services.interfaces;

import com.dut.forum.dto.User.AuthenticationData;
import com.dut.forum.dto.User.UserDto;
import com.dut.forum.dto.User.UserLoginData;
import com.dut.forum.dto.User.UserRegisterData;

public interface IUsersService {
    AuthenticationData register(UserRegisterData data);
    AuthenticationData login(UserLoginData data);

    void logout(AuthenticationData data);

    UserDto getById(String id);
}
