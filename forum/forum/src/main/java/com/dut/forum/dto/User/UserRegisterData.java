package com.dut.forum.dto.User;

import lombok.Data;

@Data
public class UserRegisterData {
    private String firstName;

    private String lastName;

    private String password;

    private String email;
}
