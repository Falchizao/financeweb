package br.edu.utfpr.pb.pw25s.server.validation;
import java.lang.annotation.ElementType;
import java.lang.annotation.*;

import javax.validation.Constraint;

@Constraint(validatedBy = UniqueUsernameValidator.class)
@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
public @interface UniqueUsername {
    String message() default "Pedro solta o macaco";
    
}
