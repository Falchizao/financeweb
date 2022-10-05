package br.edu.utfpr.pb.pw25s.server.handler.exceptions;

public class UserNotFoundInSystem extends RuntimeException{
    private String message;

    public UserNotFoundInSystem(String message){
        super(message);
    }
}
