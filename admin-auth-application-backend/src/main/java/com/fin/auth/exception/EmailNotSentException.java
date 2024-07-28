package com.fin.auth.exception;

public class EmailNotSentException extends RuntimeException {

    public EmailNotSentException(String msg){
        super(msg);
    }
}
