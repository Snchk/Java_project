package com.dut.forum.security;

import com.dut.forum.dto.User.ForumUserDetails;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.security.Principal;

@Component("dataSecurity")
public class DataSecurity {
    public boolean hasUserId(Authentication authentication, String userId) {

        return ((ForumUserDetails) authentication.getPrincipal()).getId().equals(userId);
    }

    public boolean hasId(Principal authentication) {

        return false;
    }
}
