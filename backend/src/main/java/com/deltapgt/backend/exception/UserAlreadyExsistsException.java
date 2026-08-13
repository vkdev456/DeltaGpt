package com.deltapgt.backend.exception;


public class UserAlreadyExsistsException extends RuntimeException{
      public UserAlreadyExsistsException(String message){
           super(message);
      }
}
