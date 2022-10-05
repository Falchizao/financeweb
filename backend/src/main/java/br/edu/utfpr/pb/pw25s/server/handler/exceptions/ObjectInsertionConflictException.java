package br.edu.utfpr.pb.pw25s.server.handler.exceptions;

public class ObjectInsertionConflictException extends RuntimeException{
    private String message;

    public ObjectInsertionConflictException(String message){
        super(message);
    }
}
