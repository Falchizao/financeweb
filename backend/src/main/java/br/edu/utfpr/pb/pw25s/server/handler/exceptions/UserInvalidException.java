package br.edu.utfpr.pb.pw25s.server.handler.exceptions;

public class UserInvalidException extends RuntimeException{
    private String message;

    public UserInvalidException(String message){
        super(message);
    }
}
