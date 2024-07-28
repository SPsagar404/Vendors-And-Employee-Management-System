package com.fin.auth.exception;

public class VendorAlreadyExistException extends  RuntimeException{

    public VendorAlreadyExistException(String msg){
        super(msg);
    }
}
