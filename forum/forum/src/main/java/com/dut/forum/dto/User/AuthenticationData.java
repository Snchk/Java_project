package com.dut.forum.dto.User;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthenticationData {
    private String id;
    private String token;
}
