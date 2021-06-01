package com.dut.forum.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class DataNotProvidedException extends RuntimeException {
    public DataNotProvidedException() {
        super();
    }

    public DataNotProvidedException(String message) {
        super(message);
    }

    public DataNotProvidedException(String message, Throwable cause) {
        super(message, cause);
    }
}