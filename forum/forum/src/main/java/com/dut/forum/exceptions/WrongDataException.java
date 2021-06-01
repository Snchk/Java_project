package com.dut.forum.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class WrongDataException extends RuntimeException {
    public WrongDataException() {
        super();
    }

    public WrongDataException(String message) {
        super(message);
    }

    public WrongDataException(String message, Throwable cause) {
        super(message, cause);
    }
}
