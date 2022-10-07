package br.edu.utfpr.pb.pw25s.server.handler.exceptions;

public class ObjectInvalidException extends RuntimeException{
    private String message;

    public ObjectInvalidException(String message){
        super(message);
    }
}
