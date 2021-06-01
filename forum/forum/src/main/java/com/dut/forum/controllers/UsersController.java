package com.dut.forum.controllers;

import com.dut.forum.dto.User.UserDto;
import com.dut.forum.services.interfaces.IUsersService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("users")
@AllArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000"})
public class UsersController {
    private final IUsersService usersService;

    @GetMapping("{id}")
    @ResponseStatus(HttpStatus.OK)
    public UserDto getUser(@PathVariable String id){
        return usersService.getById(id);
    }

}
