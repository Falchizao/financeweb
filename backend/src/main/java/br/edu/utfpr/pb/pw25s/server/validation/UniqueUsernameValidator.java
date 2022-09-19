package br.edu.utfpr.pb.pw25s.server.validation;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import br.edu.utfpr.pb.pw25s.server.repository.UserRepository;

public class UniqueUsernameValidator implements ConstraintValidator<UniqueUsername, String>{

    UserRepository userRepository;

    public UniqueUsernameValidator(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        if(userRepository.findByusername(value) == null){
            return true;
        }
        return false;
    }
    
}
