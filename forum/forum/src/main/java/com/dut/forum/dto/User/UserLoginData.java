package com.dut.forum.dto.User;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserLoginData {
    private String email;
    private String password;
}
