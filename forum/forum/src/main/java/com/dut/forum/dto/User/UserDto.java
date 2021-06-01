package com.dut.forum.dto.User;

import lombok.Data;

import java.util.List;

@Data
public class UserDto {
    private String id;
    private String email;
    private String firstName;
    private String lastName;
    private List<String> roles;
}
