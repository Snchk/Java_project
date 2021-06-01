package com.dut.forum.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.CONFLICT)
public class NotAccessibleException extends RuntimeException {
    public NotAccessibleException() {
        super();
    }

    public NotAccessibleException(String message) {
        super(message);
    }

    public NotAccessibleException(String message, Throwable cause) {
        super(message, cause);
    }
}