package br.edu.utfpr.pb.pw25s.server.handler;

import br.edu.utfpr.pb.pw25s.server.handler.modelException.ErrorMessage;
import br.edu.utfpr.pb.pw25s.server.handler.modelException.ResourceNotFound;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
class RestExceptionHandler {

    @ExceptionHandler(ResourceNotFound.class)
    public ResponseEntity<?> handleResourceNotFoundException(ResourceNotFound ex){

        ErrorMessage error = new ErrorMessage("Not Found"); //Personalized Message

        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(ErrorMessage.class)
    public ResponseEntity<?> handleResourceCustomErrorException(String exception){

        ErrorMessage error = new ErrorMessage(exception); //Personalized Message

        return new ResponseEntity<>(error, HttpStatus.CONFLICT);
    }

}