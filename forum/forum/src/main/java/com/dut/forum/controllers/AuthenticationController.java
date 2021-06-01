package com.dut.forum.controllers;

import com.dut.forum.dto.User.AuthenticationData;
import com.dut.forum.dto.User.UserLoginData;
import com.dut.forum.dto.User.UserRegisterData;
import com.dut.forum.services.interfaces.IUsersService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("auth")
@AllArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000"})
public class AuthenticationController {
    private final IUsersService usersService;

    @PostMapping("register")
    @ResponseStatus(HttpStatus.CREATED)
    public AuthenticationData register(@RequestBody UserRegisterData data){
        return usersService.register(data);
    }

    @PostMapping("login")
    @ResponseStatus(HttpStatus.OK)
    public AuthenticationData login(@RequestBody UserLoginData data){
        return usersService.login(data);
    }

    @PostMapping("logout")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void logout(@RequestBody AuthenticationData data){
        usersService.logout(data);
    }

    @GetMapping("is-admin")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void isAdmin(){}
}
